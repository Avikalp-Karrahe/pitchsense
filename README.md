# PitchSense - AI-Powered Startup Pitch Analysis

PitchSense is an innovative platform that leverages artificial intelligence to analyze and enhance startup pitches, helping entrepreneurs connect with the right investors and improve their fundraising success.

## Project Structure

```
├── Front-end pitchsense/     # Next.js frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   └── ...config files      # Various configuration files
├── server/                  # FastAPI backend server
│   ├── llm/                 # LLM integration modules
│   └── routes/              # API endpoints
├── data files/              # CSV datasets for analysis
└── Python scripts/          # Utility scripts
```

## Features

- AI-powered pitch analysis and improvement suggestions
- Investor matching based on startup characteristics
- Comprehensive startup insights database
- Modern Next.js frontend with Tailwind CSS
- Robust FastAPI backend with LLM integration

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- ESLint

### Backend
- FastAPI
- Python 3.13
- OpenAI/Anthropic API integration
- Various ML/AI libraries

## Setup

1. Clone the repository
```bash
git clone [repository-url]
cd pitchsense
```

2. Set up the frontend
```bash
cd Front-end\ pitchsense/
npm install
npm run dev
```

3. Set up the backend
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python server/main.py
```

4. Configure environment variables
- Copy `.env.example` to `.env`
- Add necessary API keys and configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/Avikalp-Karrahe/pitchsense](https://github.com/avikalp-karrahe/pitchsense)
