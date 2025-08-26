import json
import re
from typing import Dict, Any, Optional
from .llm_router import route_llm_call
from .confidence_scorer import analyze_pitch_confidence
from .clarifier import get_clarifying_questions_for_pitch

def generate_pitch_json(startup_name: str, industry: str, product: str, traction: str, ask: str, stage: str,
                       investor_name: str = "", investor_focus: Optional[str] = None) -> Dict[str, Any]:
    """Generate a JSON-formatted investor pitch tailored for VC audiences."""
    # Construct investor context
    investor_info = f"Investor Name: {investor_name}" + (f", Focus: {investor_focus}" if investor_focus else "")

    prompt = f"""
You are a world-class startup storyteller advising a founder preparing to pitch top-tier VCs, specifically {investor_name}.
{investor_info}

Craft a concise yet comprehensive 7-part investor pitch that covers:
1. Problem — Vivid story + quantified pain (e.g., hours lost, dollars wasted).
2. Solution — Product benefits + impact metrics (e.g., % time saved, error reduction).
3. Market — TAM, SAM, CAGR figures, and timing rationale.
4. Business Model — Revenue streams, pricing, unit economics (LTV/CAC, margins).
5. Competition & Moat — Key competitors, differentiation, defensibility.
6. Traction — Customers, ARR/MRR, growth rates, partnerships, key milestones.
7. Ask & Use of Funds — Funding amount, valuation context, deployment plan with KPIs.

Ensure each section includes at least one quantitative metric, timeframe, or specific benchmark.
Output only valid JSON in this format:
{{
  "problem": {{"text": "...", "confidence": 0.91}},
  "solution": {{"text": "...", "confidence": 0.89}},
  "market": {{"text": "...", "confidence": 0.86}},
  "business_model": {{"text": "...", "confidence": 0.88}},
  "competition": {{"text": "...", "confidence": 0.85}},
  "traction": {{"text": "...", "confidence": 0.93}},
  "ask": {{"text": "...", "confidence": 0.92}}  
}}

Startup Name: {startup_name}
Industry: {industry}
Product: {product}
Traction: {traction}
Stage: {stage}
Funding Ask: {ask}
"""

    # Call the LLM
    raw_content = route_llm_call(
        task_type='pitch_block',
        prompt=prompt,
        max_tokens=1200
    )

    # Clean and parse the response
    if not raw_content.strip():
        raise ValueError("Empty response from LLM in generate_pitch")
    raw_content = re.sub(r"^```(?:json)?\s*", "", raw_content)
    raw_content = re.sub(r"\s*```$", "", raw_content)

    # Parse JSON and analyze confidence
    raw_pitch = json.loads(raw_content)
    user_inputs = [startup_name, industry, product, traction, stage, ask]
    analyzed_pitch = analyze_pitch_confidence(raw_pitch, user_inputs)
    return analyzed_pitch

def generate_clarifying_questions(pitch_json: Dict[str, Any]) -> Dict[str, Any]:
    """Generate clarifying questions for sections with low confidence."""
    return get_clarifying_questions_for_pitch(pitch_json)

def generate_email(pitch_json: Dict[str, Any], investor_name: str = "Alex", 
                  your_name: str = "Lily Zhang", startup_name: str = "FlowPay", 
                  your_email: str = "you@example.com") -> str:
    """Generate a cold email to an investor based on the pitch."""
    traction_summary = pitch_json.get("traction", {}).get("text", "")
    ask_summary = pitch_json.get("ask", {}).get("text", "")

    prompt = f"""Generate a concise, single-paragraph cold email to a VC investor. Follow this structure exactly:
1. Subject line
2. One-line greeting
3. One paragraph combining key metrics and ask (max 3 sentences)
4. One-line call to action
5. Standard signature block

Use these details:
- Startup: {startup_name}
- Investor: {investor_name}
- Traction: {traction_summary}
- Ask: {ask_summary}
- Your Name: {your_name}
- Your Email: {your_email}

Avoid any repetition in the content. Each piece of information should appear exactly once."""

    email_content = route_llm_call(
        task_type='generate_email',
        prompt=prompt,
        max_tokens=300
    )
    
    return email_content.strip()
