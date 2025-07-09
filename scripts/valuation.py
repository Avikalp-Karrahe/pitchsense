from typing import Dict, Any, Tuple

def estimate_valuation(
    stage: str,
    industry: str,
    location: str,
    age: int
) -> Dict[str, Any]:
    """
    Estimates startup valuation based on stage, industry, location, and age.
    Returns valuation range and multiplier details.
    """
    # Base ranges by funding stage ($M)
    stage_ranges: Dict[str, Tuple[float, float]] = {
        "Pre-Seed": (0.5, 2),
        "Seed": (2, 7),
        "Series A": (8, 30),
        "Series B": (30, 100),
        "Series C": (80, 250),
        "Series D": (200, 500),
        "Pre-IPO": (500, 5000),
    }

    # Industry multipliers
    industry_mult: Dict[str, float] = {
        "Artificial Intelligence": 1.4,
        "Fintech": 1.3,
        "Healthtech": 1.5,
        "Biotech": 1.6,
        "Edtech": 0.9,
        "E-commerce": 1.0,
        "Supply Chain": 1.2,
        "Other": 1.0,
    }

    # Location multipliers
    location_mult: Dict[str, float] = {
        "San Francisco": 1.3,
        "New York": 1.2,
        "London": 1.1,
        "Beijing": 1.2,
        "Shanghai": 1.1,
        "India": 0.9,
        "Jakarta": 0.9,
        "Sao Paulo": 0.9,
        "Other": 1.0,
    }

    # Age multiplier (years since founding)
    if age < 1:
        age_mult = 0.8
    elif age < 3:
        age_mult = 1.0
    elif age < 6:
        age_mult = 1.1
    elif age < 10:
        age_mult = 1.2
    else:
        age_mult = 1.0

    # Calculate base range and multipliers
    base_low, base_high = stage_ranges.get(stage, (5, 20))
    ind = industry_mult.get(industry, 1.0)
    loc = location_mult.get(location, 1.0)
    combined = ind * loc * age_mult

    return {
        "low": round(base_low * combined, 2),
        "high": round(base_high * combined, 2),
        "base": (base_low, base_high),
        "ind_mult": ind,
        "loc_mult": loc,
        "age": age,
        "age_mult": age_mult,
        "combined": round(combined, 2),
    }