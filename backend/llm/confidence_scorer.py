import re
from typing import Dict, List, Any


def contains_user_input(sentence: str, user_inputs: List[str]) -> bool:
    """
    Check if a sentence contains any of the user inputs.
    """
    sentence_lower = sentence.lower()
    return any(user_input.lower() in sentence_lower for user_input in user_inputs if user_input)


def grade_sentence(sentence: str, user_inputs: List[str]) -> Dict[str, Any]:
    """
    Grade a sentence based on content analysis and return color code and confidence score.

    Returns:
        Dict with keys:
        - color: 'green', 'orange', or 'red'
        - confidence: float between 0 and 1
        - reason: explanation for the grading
    """
    sentence_lower = sentence.lower()
    user_matches = [ui for ui in user_inputs if ui and ui.lower() in sentence_lower]

    # 1. Green: multiple data points plus context (e.g., '%', 'ARR', 'million', 'billion')
    if len(user_matches) >= 2 and re.search(r"\d+%|\d+\s*(person-hours|hours|arr|million|billion)", sentence_lower):
        return {
            "color": "green",
            "confidence": 0.9,
            "reason": "Contains multiple specific data points plus contextual insight"
        }

    # 2. Green: references multiple specific user inputs
    if len(user_matches) >= 2:
        return {
            "color": "green",
            "confidence": 0.85,
            "reason": "References multiple user-provided data points"
        }

    # 3. Orange: single data point; check for benefit/outcome phrasing
    if len(user_matches) == 1:
        benefit_phrases = ["per", "resulted in", "led to", "enabled", "enabling", "unlock", "unlocking"]
        if any(bp in sentence_lower for bp in benefit_phrases):
            return {
                "color": "green",
                "confidence": 0.85,
                "reason": "Includes user data and demonstrates a clear benefit or outcome"
            }
        return {
            "color": "orange",
            "confidence": 0.6,
            "reason": "References user input but lacks additional insight or context"
        }

    # 4. Red flags: hype terms or unsubstantiated claims
    red_flags = [
        "we believe", "we imagine", "we're redefining", "we aim to", "revolutionize",
        "game-changing", "disrupt", "visionary", "transforming", "we think",
        "cutting-edge", "next-generation", "state-of-the-art", "innovative",
        "groundbreaking", "paradigm shift"
    ]
    if any(flag in sentence_lower for flag in red_flags):
        return {
            "color": "red",
            "confidence": 0.3,
            "reason": "Contains hype terms or unsubstantiated claims"
        }

    # 5. Orange: vague or non-specific language
    vague_terms = [
        "some", "many", "various", "aim", "target", "expected",
        "potential", "several", "multiple", "numerous", "significant"
    ]
    if any(term in sentence_lower for term in vague_terms):
        return {
            "color": "orange",
            "confidence": 0.6,
            "reason": "Contains vague or non-specific language"
        }

    # 6. Default to orange for any other general statements
    return {
        "color": "orange",
        "confidence": 0.7,
        "reason": "General statement without specific backing"
    }


def analyze_pitch_confidence(pitch_json: Dict[str, Any], user_inputs: List[str]) -> Dict[str, Any]:
    """
    Analyze confidence for each section and sentence in the pitch JSON.

    Args:
        pitch_json: The pitch JSON with 'text' fields per section
        user_inputs: List of user inputs to evaluate specificity

    Returns:
        Enhanced pitch JSON with per-sentence grading and section-level averages
    """
    enhanced_pitch: Dict[str, Any] = {}
    for section, data in pitch_json.items():
        section_text = data.get("text", "")
        # Split on sentence endings
        sentences = re.split(r'(?<=[.!?])\s+', section_text.strip())
        graded_sentences = []
        total_confidence = 0.0

        for sentence in sentences:
            if not sentence:
                continue
            grade = grade_sentence(sentence, user_inputs)
            graded_sentences.append({
                "text": sentence,
                "color": grade["color"],
                "confidence": grade["confidence"],
                "reason": grade["reason"]
            })
            total_confidence += grade["confidence"]

        avg_confidence = (total_confidence / len(graded_sentences)) if graded_sentences else 0.0
        enhanced_pitch[section] = {
            "text": section_text,
            "confidence": avg_confidence,
            "sentences": graded_sentences
        }

    return enhanced_pitch
