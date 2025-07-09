from typing import List, Dict, Any
from .llm_router import route_llm_call

def get_clarifying_questions(section_name: str, section_text: str, confidence_score: Dict[str, Any]) -> List[str]:
    """Generate clarifying questions for a pitch section marked as red."""
    prompt = f"""You are an AI pitch advisor helping improve a startup pitch. A section of the pitch has been marked as needing clarification.

Section: {section_name}
Current text: {section_text}

This section was marked as needing improvement because: {confidence_score['reason']}

Generate 2-3 specific questions that would help gather information to improve this section. Focus on:
1. Requesting concrete data and metrics
2. Clarifying vague or generic statements
3. Getting specific examples or proof points

Format your response as a Python list of questions only.
"""

    response = route_llm_call(
        task_type='clarify_question',
        prompt=prompt,
        max_tokens=300
    )

    # Convert string response to list of questions
    try:
        # Clean up the response and evaluate it as a Python list
        questions_str = response.strip().replace('```python', '').replace('```', '').strip()
        questions = eval(questions_str)
        
        # Validate and clean questions
        if isinstance(questions, list):
            return [q.strip() for q in questions if isinstance(q, str)]
        return []
    except:
        # Fallback: split by newlines and clean up
        questions = response.split('\n')
        return [q.strip('- ').strip() for q in questions if q.strip('- ').strip()]

def get_clarifying_questions_for_pitch(analyzed_pitch: Dict[str, Any]) -> Dict[str, List[str]]:
    """Generate clarifying questions for all sections with low confidence scores."""
    clarifying_questions = {}
    
    for section_name, section_data in analyzed_pitch.items():
        # Check if section has confidence score and it's below threshold
        if section_data.get('confidence', 1.0) < 0.7:
            questions = get_clarifying_questions(
                section_name,
                section_data['text'],
                section_data
            )
            if questions:
                clarifying_questions[section_name] = questions
    
    return clarifying_questions