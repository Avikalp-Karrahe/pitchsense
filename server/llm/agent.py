from typing import Dict, List, Any, Optional
from .confidence_scorer import grade_sentence
from .clarifier import get_clarifying_questions
from .generator import generate_pitch_json, generate_email
from .improver import improve_pitch_section
from .llm_router import route_llm_call
from .matching import match_vc_to_startup_enhanced

class PitchAgent:
    def __init__(self):
        self.startup_info = {}
        self.pitch_data = {}
        self.confidence_scores = {}
        self.clarifying_questions = {}

    def set_startup_info(self, startup_info: Dict[str, str]):
        """Store startup information for pitch generation."""
        self.startup_info = startup_info

    def generate_initial_pitch(self) -> Dict[str, Any]:
        """Generate initial pitch with confidence scoring."""
        self.pitch_data = generate_pitch_json(
            startup_name=self.startup_info.get('startup_name', ''),
            industry=self.startup_info.get('sector', ''),
            product=self.startup_info.get('product', ''),
            traction=self.startup_info.get('traction', ''),
            ask=self.startup_info.get('raise_', ''),
            stage=self.startup_info.get('stage', '')
        )
        
        # Score each section
        self.analyze_pitch_confidence()
        return self.pitch_data

    def analyze_pitch_confidence(self):
        """Analyze pitch sections and assign confidence scores."""
        user_inputs = [
            self.startup_info.get('startup_name', ''),
            self.startup_info.get('sector', ''),
            self.startup_info.get('product', ''),
            self.startup_info.get('traction', ''),
            self.startup_info.get('raise_', '')
        ]

        for section_name, section_data in self.pitch_data.items():
            if isinstance(section_data, dict) and 'text' in section_data:
                section_text = section_data['text']
                # Split section text into sentences for individual grading
                sentences = [s.strip() for s in section_text.split('.')]
                section_scores = []
                
                for sentence in sentences:
                    if sentence:  # Skip empty sentences
                        grade_result = grade_sentence(sentence, user_inputs)
                        section_scores.append(grade_result)
                
                # Calculate section-level confidence
                if section_scores:
                    avg_confidence = sum(score['confidence'] for score in section_scores) / len(section_scores)
                    worst_color = min(score['color'] for score in section_scores)
                    self.confidence_scores[section_name] = {
                        'color': worst_color,
                        'confidence': avg_confidence,
                        'reason': 'Multiple issues need addressing' if worst_color == 'red' else 'Some improvements needed'
                    }

    def get_clarifying_questions(self) -> Dict[str, List[str]]:
        """Generate clarifying questions for low-confidence sections."""
        questions = {}
        for section_name, score in self.confidence_scores.items():
            if score['color'] == 'red':
                section_text = self.pitch_data[section_name]['text']
                questions[section_name] = get_clarifying_questions(
                    section_name=section_name,
                    section_text=section_text,
                    confidence_score=score
                )
        self.clarifying_questions = questions
        return questions

    def improve_section(self, section_name: str, user_input: str) -> Dict[str, Any]:
        """Improve a specific section based on user input."""
        if section_name not in self.pitch_data:
            raise ValueError(f"Section {section_name} not found in pitch data")

        current_text = self.pitch_data[section_name]['text']
        improved_section = improve_pitch_section(
            section_name=section_name,
            current_text=current_text,
            user_input=user_input
        )

        # Update pitch data
        self.pitch_data[section_name]['text'] = improved_section['text']
        
        # Reanalyze confidence
        self.analyze_pitch_confidence()
        return self.pitch_data

    def match_investors(self) -> List[Dict[str, Any]]:
        """Find matching investors based on startup info."""
        return match_vc_to_startup_enhanced(
            startup_name=self.startup_info.get('startup_name', ''),
            industry=self.startup_info.get('sector', ''),
            stage=self.startup_info.get('stage', ''),
            location=self.startup_info.get('location', '')
        )

    def generate_email(self, investor_info: Dict[str, str]) -> str:
        """Generate personalized email for matched investor."""
        return generate_email(
            pitch_json=self.pitch_data,
            investor_name=investor_info.get('name', ''),
            your_name=self.startup_info.get('your_name', ''),
            startup_name=self.startup_info.get('startup_name', ''),
            your_email=self.startup_info.get('your_email', '')
        )