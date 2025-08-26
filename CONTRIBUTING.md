# 🤝 Contributing to PitchSense

Thank you for your interest in contributing to PitchSense! We welcome contributions from the community and are excited to see what you'll bring to our AI-powered startup pitch analysis platform.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Areas for Contribution](#areas-for-contribution)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Be patient** with newcomers
- **Focus on the issue**, not the person

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.x or higher** (for frontend)
- **Python 3.13** (for backend)
- **npm, yarn, or pnpm** (package manager)
- **Git** (version control)
- **Basic knowledge of:**
  - React, Next.js, and TypeScript (frontend)
  - FastAPI and Python (backend)
  - AI/LLM integration concepts

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pitchsense.git
   cd pitchsense
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Avikalp-Karrahe/pitchsense.git
   ```

4. **Set up the frontend**
   ```bash
   cd "Front-end pitchsense"
   npm install
   ```

5. **Set up the backend**
   ```bash
   # Navigate back to root
   cd ..
   
   # Create and activate virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   
   # Install Python dependencies
   pip install -r requirements.txt
   ```

6. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   touch .env
   
   # Add your API keys:
   # OPENAI_API_KEY=your_openai_key_here
   # ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

7. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   python server/main.py
   
   # Terminal 2: Start frontend
   cd "Front-end pitchsense"
   npm run dev
   ```

## 🔄 Making Changes

### Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic
   - Test both frontend and backend changes

3. **Test your changes**
   ```bash
   # Frontend testing
   cd "Front-end pitchsense"
   npm run lint
   npm run build
   
   # Backend testing
   cd ..
   python -m pytest  # If tests exist
   python server/main.py  # Manual testing
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(ui): add dark mode toggle animation
fix(api): resolve job scraping timeout issue
docs(readme): update installation instructions
```

## 🔀 Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Use our PR template
   - Provide clear description
   - Link related issues
   - Add screenshots if UI changes

4. **Review Process**
   - Code review by maintainers
   - Address feedback
   - Ensure CI passes
   - Approval and merge

### Pull Request Template

```markdown
## 📝 Description
Brief description of changes

## 🔗 Related Issues
Fixes #123

## 🧪 Testing
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Tested on mobile
- [ ] All API endpoints work

## 📸 Screenshots
(if applicable)

## ✅ Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 💻 Coding Standards

### Frontend (TypeScript/React)

- Use strict typing
- Avoid `any` type
- Use interfaces for object types
- Export types when used across files

```typescript
// Good
interface StartupProfile {
  name: string;
  sector: string;
  stage: string;
  valuation: number;
}

// Avoid
const startupData: any = {};
```

### React Components

- Use functional components with hooks
- Use TypeScript props interfaces
- Follow naming conventions
- Use proper file structure

```typescript
// components/PitchCard.tsx
interface PitchCardProps {
  title: string;
  content: string;
  confidence: 'high' | 'medium' | 'low';
  onImprove?: () => void;
}

export function PitchCard({ title, content, confidence, onImprove }: PitchCardProps) {
  return (
    <div className={`pitch-card confidence-${confidence}`}>
      <h3>{title}</h3>
      <p>{content}</p>
      {onImprove && <button onClick={onImprove}>Improve</button>}
    </div>
  );
}
```

### Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Use consistent color schemes
- Maintain accessibility standards

```tsx
// Good
<div className="bg-white p-4 rounded-lg shadow-lg">

// Consistent button styling
<button className="py-4 px-8 bg-[#62C494] rounded-lg font-bold">
```

### Backend (Python/FastAPI)

- Use type hints for all functions
- Follow PEP 8 style guidelines
- Use Pydantic models for request/response
- Handle errors gracefully

```python
# Good
from pydantic import BaseModel
from typing import Optional, List

class StartupInfo(BaseModel):
    startup_name: str
    sector: str
    stage: str
    age: int
    raise_amount: Optional[float] = None

@router.post('/generate_pitch')
def generate_pitch(startup_info: StartupInfo) -> Dict[str, Any]:
    try:
        agent = PitchAgent()
        result = agent.generate_initial_pitch(startup_info.dict())
        return {'success': True, 'data': result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### LLM Integration

- Use environment variables for API keys
- Implement proper error handling for API calls
- Add retry logic for failed requests
- Log important events for debugging

```python
# Good
import os
from dotenv import load_dotenv

load_dotenv()

class LLMClient:
    def __init__(self):
        self.api_key = os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError('OPENAI_API_KEY not found in environment')
    
    def generate_content(self, prompt: str) -> str:
        try:
            # API call implementation
            pass
        except Exception as e:
            logger.error(f'LLM API call failed: {e}')
            raise
```

## 🧪 Testing

### Manual Testing Checklist

#### Frontend Testing
- [ ] **Functionality**: All forms and navigation work
- [ ] **Responsive**: Test on mobile, tablet, and desktop
- [ ] **User Flow**: Complete startup profile → investor matching → pitch generation
- [ ] **Performance**: Fast loading and smooth interactions
- [ ] **Accessibility**: Keyboard navigation and screen readers
- [ ] **Cross-browser**: Test in Chrome, Firefox, Safari, Edge

#### Backend Testing
- [ ] **API Endpoints**: All routes return expected responses
- [ ] **LLM Integration**: OpenAI/Anthropic APIs work correctly
- [ ] **Error Handling**: Graceful handling of invalid inputs
- [ ] **Data Validation**: Pydantic models validate correctly
- [ ] **Performance**: Reasonable response times for AI operations

#### Integration Testing
- [ ] **Frontend-Backend**: API calls work from frontend
- [ ] **File Operations**: PDF parsing and document export
- [ ] **Investor Matching**: Algorithm returns relevant matches
- [ ] **Pitch Generation**: AI generates coherent pitch content

### Testing Commands

```bash
# Frontend testing
cd "Front-end pitchsense"
npm run lint
npm run build
npm start

# Backend testing
cd ..
python -m pytest  # When tests are added
python server/main.py  # Manual API testing

# Test API endpoints manually
curl -X POST http://localhost:8000/api/generate_pitch \
  -H "Content-Type: application/json" \
  -d '{"startup_name":"TestCorp","sector":"AI","stage":"Seed","age":2}'
```

## 🎯 Areas for Contribution

### 🌟 High Priority

- **LLM Integration**: Improve AI prompt engineering and response quality
- **Investor Database**: Expand and maintain investor matching data
- **Performance Optimization**: Reduce API response times and frontend loading
- **Error Handling**: Better error messages and graceful degradation

### 🔧 Feature Additions

- **Multi-Model Support**: Add support for more LLM providers (Claude, Gemini)
- **Advanced Analytics**: Pitch performance tracking and insights
- **Collaboration Tools**: Team sharing and feedback features
- **Export Formats**: Enhanced PDF/PowerPoint export capabilities
- **Industry Templates**: Sector-specific pitch templates
- **Investor CRM**: Basic relationship management features

### 🎨 UI/UX Improvements

- **Interactive Pitch Builder**: Drag-and-drop pitch creation
- **Real-time Collaboration**: Live editing with team members
- **Mobile Optimization**: Better mobile experience for pitch creation
- **Animations**: Smooth transitions and loading states
- **Accessibility**: Screen reader support and keyboard navigation

### 🤖 AI/ML Enhancements

- **Confidence Scoring**: Improve pitch section confidence algorithms
- **Personalization**: Better investor-startup matching algorithms
- **Content Generation**: Enhanced pitch content quality
- **Feedback Loop**: Learn from user interactions to improve suggestions

### 🔧 Backend Improvements

- **Caching**: Implement Redis for faster responses
- **Database**: Add PostgreSQL for persistent data storage
- **Authentication**: User accounts and session management
- **Rate Limiting**: API protection and usage monitoring
- **Testing**: Comprehensive test suite for all components

### 📚 Documentation

- **API Documentation**: Comprehensive FastAPI docs
- **Setup Guides**: Detailed development environment setup
- **Architecture Docs**: System design and component interaction
- **User Guides**: How to use PitchSense effectively

## 🆘 Need Help?

- 💬 **Discussions**: [GitHub Discussions](https://github.com/Avikalp-Karrahe/pitchsense/discussions)
- 🐛 **Issues**: [Report bugs](https://github.com/Avikalp-Karrahe/pitchsense/issues)
- 📧 **Email**: [akarrahe@ucdavis.edu](mailto:akarrahe@ucdavis.edu)
- 💼 **LinkedIn**: Connect with the team members listed in README

## 🏆 Recognition

Contributors will be:
- Added to our contributors list
- Mentioned in release notes
- Featured on our website (for significant contributions)
- Invited to join our contributor Discord server

---

**Thank you for making PitchSense better! 🚀**