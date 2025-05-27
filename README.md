<p align="center">
  <a href="#contributors-"><img alt="Contributors" src="https://img.shields.io/badge/Contributors-4-371C58?style=flat-square&logo=github&logoColor=white"/></a>
  <a href="LICENSE"><img alt="License MIT" src="https://img.shields.io/badge/License-MIT-007ACC?style=flat-square&logo=mit&logoColor=white"/></a>
  <a href="#"><img alt="AgentHacks 2025–Winner" src="https://img.shields.io/badge/AgentHacks_2025–Winner-EE6352?style=flat-square"/></a>
  <a href="https://devpost.com/software/pitchsen"><img alt="Devpost Submission" src="https://img.shields.io/badge/Devpost-PitchSense-blue?style=flat-square&logo=devpost"/></a>
</p>

# 🚀 PitchSense: Your AI Co-Pilot for Fundraising Success

<p align="center">
  <img src="pitchsense_logo.png" alt="PitchSense Logo" width="600"/>
</p>

**Streamline investor discovery, pitch generation, and outreach with AI-powered precision.**

> **TL;DR:** Instantly match with ideal investors, craft compelling pitches and emails, and track your outreach—all in one place.

---

## 🏆 Awards
- 🥇 **Most Impactful Award** – AgentHacks 2025

---

## 📋 Table of Contents
1. [Executive Summary](#executive-summary)
2. [The Challenge](#the-challenge)
3. [How It Works](#how-it-works)
4. [Innovation Highlights](#innovation-highlights)
5. [Live Demo & Visuals](#live-demo--visuals)
6. [Continuous Development Roadmap](#continuous-development-roadmap)
7. [Installation & Quick Start](#installation--quick-start)
8. [Built With](#built-with)
9. [Project Structure](#project-structure)
10. [Contributors](#contributors)
11. [License & Acknowledgments](#license--acknowledgments)

---

## 🧠 Executive Summary
PitchSense addresses the inefficiencies of traditional fundraising. By leveraging AI, it accelerates investor matching, creates tailored outreach materials, and manages communications seamlessly. This dramatically boosts the efficiency and success rate of fundraising efforts.

[View Devpost Submission](https://devpost.com/software/pitchsen)

---

## 🚩 The Challenge
Traditional fundraising involves manual investor discovery, generic pitches, and fragmented outreach tracking. This inefficiency wastes valuable founder time and resources, reducing their focus on core business growth.

---

## 🔄 How It Works
1. **Investor Matching Engine**
   - Captures founder details (sector, stage, traction)
   - Uses semantic search with OpenAI Embeddings and FAISS
   - Provides ranked investor recommendations

2. **Dynamic Pitch Generator**
   - Customizes pitch decks and emails using GPT-4
   - Provides confidence tags for human oversight

3. **Outreach Management**
   - CRM-lite tracking system (Airtable/Notion integration)
   - Status indicators: Contacted, Replied, Intro Requested

---

## 💡 Innovation Highlights
- **Smart Matchmaking:** Highly relevant, personalized investor recommendations  
- **AI-enhanced Communication:** Human-like tone, avoiding robotic phrasing  
- **Integrated Outreach Tracking:** Real-time CRM synchronization for transparency  
- **Human-AI Collaborative Interface (HCI):** Seamlessly integrates human judgment with AI suggestions, enhancing decision-making and trust.  

---

## 🚀 Live Demo & Visuals
- **[GitHub Repository](https://github.com/Avikalp-Karrahe/pitchsense)**
- **[Demo Video (Loom)](https://www.loom.com)**

---

## 🌟 Continuous Development Roadmap

PitchSense is more than a tool—it's your AI fundraising agent, continuously evolving through advanced AI and human-AI collaboration:

- **Phase 1: Intelligent Automation (Current)**  
  - Robust investor matching and pitch generation  
  - Initial CRM integration for seamless outreach management  

- **Phase 2: Enhanced Human-AI Collaboration (Next)**  
  - Interactive feedback loops to refine AI predictions  
  - Real-time human-in-the-loop interventions for critical decisions  
  - Enhanced UI/UX design for intuitive human-AI interaction  

- **Phase 3: Fully Autonomous Agentic System (Future)**  
  - Autonomous management of investor communications  
  - Predictive analytics to forecast fundraising success  
  - Integration with broader fundraising ecosystems  

PitchSense aims to empower founders by turning AI into a trusted co-pilot, blending efficiency and human insight seamlessly.

---

## ⚙️ Installation & Quick Start
```bash
# Clone repository
git clone https://github.com/Avikalp-Karrahe/pitchsense.git
cd pitchsense

# Setup frontend
cd Front-end\ pitchsense
npm install
npm run dev

# Setup backend
cd ../server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn server.main:app --reload
```

Open <http://localhost:8501> to interact.

---

## 🛠️ Built With
- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** FastAPI, Python, GPT-4, Anthropic Claude  
- **Database:** CSV, FAISS embeddings  
- **Infrastructure:** Vercel, AWS Lambda  

---

## 🗂️ Project Structure
```
├── Front-end pitchsense/         # Next.js frontend application
│   ├── public/                   # Static assets
│   ├── src/                      # Source code
│   ├── match_api.py              # Matching helper used by frontend
│   ├── eslint.config.mjs         # ESLint configuration
│   ├── next.config.ts            # Next.js configuration
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── README.md                 # Frontend-specific README
├── server/                       # FastAPI backend
│   ├── llm/                      # LLM integration modules (OpenAI, Anthropic)
│   ├── routes/                   # API routes (investor-match, pitch-gen, etc.)
│   ├── main.py                   # Backend entrypoint
│   └── __pycache__/              # Compiled Python cache
├── data files/                   # CSV datasets for analysis
│   ├── VC_FundStage_Location_Sector.csv
│   ├── Startup Insights (2012–2021).csv
│   └── vc22.csv
├── Python scripts/               # Standalone utility logic
│   ├── agent_runner.py
│   ├── matching.py
│   ├── pitch&email.py
│   ├── confidence_scorer.py
│   ├── generator.py
│   ├── clarifier.py
│   ├── improver.py
│   └── llm_router.py
├── requirements.txt              # Backend dependencies
├── .env                          # Environment variables (not committed)
└── README.md                     # This documentation
```

---

## 👥 Contributors

| Name             | Role      | LinkedIn                                                | GitHub                                       |
|------------------|-----------|---------------------------------------------------------|----------------------------------------------|
| Avikalp Karrahe  | Backend   | [LinkedIn](https://www.linkedin.com/in/avikalp/)        | [GitHub](https://github.com/Avikalp-Karrahe) |
| Yifei (Lexie) Li | Backend   | [LinkedIn](https://www.linkedin.com/in/yifeilexie/)     | [GitHub](https://github.com/Yifei-Lexie-Li)  |
| Rachel Guo       | Frontend  | [LinkedIn](https://www.linkedin.com/in/rachel-guo0429/) | [GitHub](https://github.com/rachelqingguo)   |
| Chaitanya Khot   | UX Design | [LinkedIn](https://www.linkedin.com/in/chaitanyakhot/)  | [GitHub](https://github.com/ckkhot)          |

---

## 📜 License & Acknowledgments
Distributed under the [MIT License](LICENSE).

Special thanks to AgentHacks organizers, mentors, and our fellow participants for invaluable support and inspiration.

<div align="center">
⭐️ If you found PitchSense valuable, please star our <a href="https://devpost.com/software/pitchsen">Devpost Submission</a> and share it with your network! ⭐️<br/>
You made it all the way here! Thank you for your time and support 🙌
</div>
