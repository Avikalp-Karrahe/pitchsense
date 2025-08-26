from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from difflib import SequenceMatcher

app = FastAPI()

# Load VC and startup data
df_vc = pd.read_csv("VC_FundStage_Location_Sector.csv")
df_startup = pd.read_csv("Startup Insights (2012-2021) Copy export 2025-05-23 23-37-23.csv")

# Preprocessing
df_vc["Fund_Focus_Clean"] = df_vc["Fund Focus (Sectors)"].fillna("").str.lower().str.strip()
df_vc["Location_Clean"] = df_vc["Location"].fillna("").str.lower().str.strip()
df_vc["Fund_Stage_Clean"] = df_vc["Fund Stage"].fillna("").str.lower().str.strip()
df_vc["Investor_Name_Clean"] = df_vc["Investor Name"].fillna("").str.lower().str.strip()

industry_mapping = {
    'artificial intelligence': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'ai/ml'],
    'fintech': ['fintech', 'financial', 'payment', 'banking', 'finance'],
    'ecommerce': ['e-commerce', 'ecommerce', 'retail', 'marketplace'],
    'health': ['health', 'healthcare', 'medical', 'biotech', 'life science', 'med device'],
    'software': ['software', 'saas', 'internet software', 'tech'],
    'edtech': ['edtech', 'education', 'learning'],
    'supply chain': ['supply chain', 'logistics', 'transportation'],
    'data': ['data', 'big data', 'analytics', 'data management'],
    'hardware': ['hardware', 'iot', 'devices'],
    'blockchain': ['blockchain', 'crypto', 'web3'],
    'gaming': ['gaming', 'games', 'entertainment'],
    'food': ['food', 'agtech', 'agriculture'],
    'energy': ['energy', 'climate', 'cleantech'],
    'other': ['other', 'various', 'general']
}

def normalize_industry(industry_text):
    industry_text = str(industry_text).lower().strip()
    for standard, variations in industry_mapping.items():
        if any(var in industry_text for var in variations):
            return standard
    return industry_text

def calculate_similarity(str1, str2):
    return SequenceMatcher(None, str1, str2).ratio()

def infer_startup_stage_from_valuation(val):
    if pd.isna(val) or val == 0:
        return "unknown"
    elif val < 2:
        return "series a"
    elif val < 5:
        return "series b"
    elif val < 10:
        return "series c"
    elif val < 30:
        return "series d"
    elif val < 100:
        return "late"
    else:
        return "pre-ipo"

def is_stage_compatible(startup_stage, vc_stages_str):
    if pd.isna(vc_stages_str) or startup_stage == "unknown":
        return True

    vc_stages_str = str(vc_stages_str).lower()
    stage_keywords = {
        'seed': ['seed', 'pre-seed'],
        'series a': ['seed', 'series a', 'pre-seed'],
        'series b': ['series a', 'series b', 'seed'],
        'series c': ['series b', 'series c', 'series a'],
        'series d': ['series c', 'series d', 'series b'],
        'pre-ipo': ['series c', 'series d', 'pre-ipo']
    }

    if startup_stage in stage_keywords:
        return any(keyword in vc_stages_str for keyword in stage_keywords[startup_stage])

    return True

def check_existing_investor_match(startup_investors, vc_name):
    if pd.isna(startup_investors) or pd.isna(vc_name):
        return False

    startup_investors = str(startup_investors).lower()
    vc_name = str(vc_name).lower()
    vc_keywords = vc_name.replace('ventures', '').replace('capital', '').replace('partners', '').strip().split()

    return any(keyword in startup_investors for keyword in vc_keywords if len(keyword) > 2)

class Startup(BaseModel):
    name: str
    valuation: float
    industry: str
    city: str
    country: str
    has_investor: str = ""

@app.post("/api/match")
def match(startup: Startup):
    results = []
    startup_industry = normalize_industry(startup.industry)
    startup_city = startup.city.lower().strip()
    startup_country = startup.country.lower().strip()
    startup_investors = startup.has_investor.lower()
    startup_stage = infer_startup_stage_from_valuation(startup.valuation)

    for _, vc in df_vc.iterrows():
        score = 0
        reasons = []

        vc_focus = str(vc["Fund_Focus_Clean"])
        vc_industry_normalized = normalize_industry(vc_focus)

        if startup_industry == vc_industry_normalized:
            score += 4
            reasons.append(f"perfect industry match ({startup_industry})")
        elif startup_industry in vc_focus or any(word in vc_focus for word in startup_industry.split()):
            score += 3
            reasons.append(f"industry overlap ({startup_industry})")
        elif calculate_similarity(startup_industry, vc_focus) > 0.3:
            score += 2
            reasons.append("similar industry")

        vc_location = str(vc["Location_Clean"])
        if startup_country in vc_location:
            score += 2
            reasons.append("same country")
        elif startup_city in vc_location:
            score += 1
            reasons.append("same city")
        elif any(region in vc_location for region in ['asia', 'europe', 'america']) and startup_country != 'united states':
            score += 1
            reasons.append("regional match")

        if is_stage_compatible(startup_stage, vc["Fund_Stage_Clean"]):
            score += 2
            reasons.append(f"stage fit ({startup_stage})")

        if check_existing_investor_match(startup_investors, vc["Investor Name"]):
            score += 1
            reasons.append("existing investor")

        if startup.valuation > 50 and 'seed' in str(vc["Fund_Stage_Clean"]).lower():
            score -= 1
            reasons.append("valuation too high for seed-stage VC")

        results.append({
            "name": vc["Investor Name"],
            "score": score,
            "industry": vc["Fund Focus (Sectors)"],
            "stage": vc["Fund Stage"],
            "location": vc["Location"],
            "reason": " | ".join(reasons)
        })

    top5 = sorted(results, key=lambda x: x["score"], reverse=True)[:5]
    return {"matches": top5}
