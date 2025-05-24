import os
from typing import Optional
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_openai(prompt: str, temperature: float = 0.7, max_tokens: Optional[int] = None) -> str:
    """Send a prompt to OpenAI GPT-4 and return the completion.

    Args:
        prompt: The user prompt to send to GPT-4.
        temperature: Sampling temperature.
        max_tokens: Maximum tokens to generate in the response.

    Returns:
        The generated text response, stripped of leading/trailing whitespace.
    """
    params = {
        "model": "gpt-4-turbo-preview",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature
    }
    
    if max_tokens is not None:
        params["max_tokens"] = max_tokens

    try:
        response = client.chat.completions.create(**params)
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")
