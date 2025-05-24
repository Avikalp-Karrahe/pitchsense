from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Any, Optional, Tuple
from server.llm.agent import PitchAgent
from server.llm.valuation import estimate_valuation

router = APIRouter()

class StartupInfo(BaseModel):
    startup_name: str
    sector: str
    stage: str
    country: Optional[str] = ''
    city: Optional[str] = ''
    age: int
    raise_amount: Optional[float] = None
    description: Optional[str] = ''

class ValuationEstimate(BaseModel):
    low: float
    high: float
    base: Tuple[float, float]
    ind_mult: float
    loc_mult: float
    age: int
    age_mult: float
    combined: float

class InvestorMatch(BaseModel):
    name: str
    match_score: float
    reasons: List[str]
    focus: str
    stage: str
    location: str
    personalized_insight: str

class MatchResponse(BaseModel):
    estimate: ValuationEstimate
    matches: List[InvestorMatch]

class SectionImprovement(BaseModel):
    section_name: str
    user_input: str
    startup_info: StartupInfo

class InvestorMatch(BaseModel):
    investor_name: str
    firm_name: str

@router.post('/generate_pitch')
def generate_pitch(startup_info: StartupInfo):
    try:
        # Initialize agent
        agent = PitchAgent()
        agent.set_startup_info(startup_info.dict())
        
        # Generate pitch with confidence scoring
        pitch_data = agent.generate_initial_pitch()
        
        # Get clarifying questions for low-confidence sections
        questions = agent.get_clarifying_questions()
        
        # Get matching investors
        matches = agent.match_investors()
        
        # Generate email if we have matches
        email = None
        if matches:
            top_investor = {
                'name': matches[0]['name'],
                'firm': matches[0]['focus']
            }
            email = agent.generate_email(top_investor)
        
        return {
            'pitch': pitch_data,
            'confidence_scores': agent.confidence_scores,
            'clarifying_questions': questions,
            'investor_matches': matches[:5],
            'email': email
        }
    except Exception as e:
        import logging
        logging.error(f'Error generating pitch: {str(e)}', exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/improve_section')
def improve_section(improvement: SectionImprovement):
    try:
        # Initialize agent with existing startup info
        agent = PitchAgent()
        agent.set_startup_info(improvement.startup_info.dict())
        
        # Improve the specified section
        improved_pitch = agent.improve_section(
            improvement.section_name,
            improvement.user_input
        )
        
        # Get updated confidence scores and questions
        status = agent.get_pitch_status()
        
        return {
            'pitch': improved_pitch,
            'confidence_scores': status['confidence_scores'],
            'clarifying_questions': status['clarifying_questions']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/match_investors', response_model=MatchResponse)
def match_investors(profile: StartupInfo):
    try:
        # 1. Compute valuation estimate
        val = estimate_valuation(
            stage=profile.stage,
            industry=profile.sector,
            location=profile.city or 'Other',
            age=profile.age
        )

        # 2. Get investor matches
        agent = PitchAgent()
        agent.set_startup_info(profile.dict())
        matches = agent.match_investors()

        # 3. Format response
        return {
            'estimate': ValuationEstimate(**val),
            'matches': matches[:5]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/generate_email')
def generate_email(startup_info: StartupInfo, investor: InvestorMatch):
    try:
        agent = PitchAgent()
        agent.set_startup_info(startup_info.dict())
        
        # First generate the pitch to have content for the email
        agent.generate_initial_pitch()
        
        # Generate email
        email = agent.generate_email(investor.dict())
        return {'email': email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
