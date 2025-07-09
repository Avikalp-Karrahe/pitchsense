from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from server.routes.pitch import router as pitch_router

# Load environment variables from .env into os.environ
load_dotenv()

app = FastAPI(
    title="PitchSense Agent API",
    description="Generate investor pitch slides and cold emails from structured startup input.",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pitch_router, prefix="/api", tags=["Pitch & Email"])
