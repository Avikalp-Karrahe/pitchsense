import os
from dotenv import load_dotenv
import anthropic

# Load environment variables from .env
load_dotenv()

# Initialize Anthropic client with API key
client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))

def call_claude(prompt: str, temperature: float = 0.3, max_tokens: int = 512) -> str:
    """
    Send a prompt to Anthropic Claude and return the completion.

    Args:
        prompt: The user prompt to send to Claude.
        temperature: Sampling temperature.
        max_tokens: Maximum tokens to sample in the response.

    Returns:
        The generated text response from Claude, stripped of leading/trailing whitespace.
    """
    response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=max_tokens,
        temperature=temperature,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.content[0].text.strip()
