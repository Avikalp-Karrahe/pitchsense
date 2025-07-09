from typing import List, Dict, Any
import pandas as pd
from .llm_router import route_llm_call

def match_vc_to_startup_enhanced(startup_name: str, industry: str, stage: str = "", location: str = "") -> List[Dict[str, Any]]:
    """Match startup to VCs using both data-driven and LLM-enhanced matching."""
    # Load VC dataset
    df_vc = pd.read_csv("VC_FundStage_Location_Sector.csv")
    
    # Clean and normalize data
    df_vc["Fund_Focus_Clean"] = df_vc["Fund Focus (Sectors)"].fillna("").str.lower().str.strip()
    df_vc["Location_Clean"] = df_vc["Location"].fillna("").str.lower().str.strip()
    df_vc["Fund_Stage_Clean"] = df_vc["Fund Stage"].fillna("").str.lower().str.strip()
    
    # Initial filtering
    matches = []
    for _, vc in df_vc.iterrows():
        score = 0
        reasons = []
        
        # Industry match
        if any(ind.lower() in vc["Fund_Focus_Clean"] for ind in industry.lower().split(",")):
            score += 0.4
            reasons.append(f"Industry focus match: {vc['Fund Focus (Sectors)']}")
        
        # Stage match (if provided)
        if stage and stage.lower() in vc["Fund_Stage_Clean"]:
            score += 0.3
            reasons.append(f"Stage match: {vc['Fund Stage']}")
            
        # Location match (if provided)
        if location and location.lower() in vc["Location_Clean"]:
            score += 0.3
            reasons.append(f"Location match: {vc['Location']}")
        
        if score > 0:
            matches.append({
                "name": vc["Investor Name"],
                "match_score": round(score, 2),
                "reasons": reasons,
                "focus": vc["Fund Focus (Sectors)"],
                "stage": vc["Fund Stage"],
                "location": vc["Location"]
            })
    
    # Sort by match score
    matches.sort(key=lambda x: x["match_score"], reverse=True)
    
    # Use LLM to enhance top matches with personalized insights
    enhanced_matches = []
    for match in matches[:5]:  # Enhance top 5 matches
        prompt = f"""Analyze this potential investor match for {startup_name} (industry: {industry}):

Investor: {match['name']}
Focus Areas: {match['focus']}
Stage: {match['stage']}
Location: {match['location']}

Provide a brief, specific reason why this could be a good match, focusing on unique synergies.
Return only a single sentence without any prefixes or formatting."""
        
        insight = route_llm_call(
            task_type="pitch_block",
            prompt=prompt,
            max_tokens=100
        )
        
        match["personalized_insight"] = insight.strip()
        enhanced_matches.append(match)
    
    return enhanced_matches