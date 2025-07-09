from typing import Optional
from .openai_client import call_openai
from .anthropic_client import call_claude

def deduplicate_response(response: str) -> str:
    """Remove duplicate lines and paragraphs from LLM response."""
    lines = response.split('\n')
    deduped_lines = []
    prev_line = None
    empty_line_count = 0
    
    for line in lines:
        # Handle empty lines: allow max one empty line between content
        if not line.strip():
            empty_line_count += 1
            if empty_line_count <= 1:
                deduped_lines.append(line)
            continue
        
        # Reset empty line counter when we hit content
        empty_line_count = 0
        
        # Skip if line is identical to previous non-empty line
        if line.strip() == (prev_line.strip() if prev_line else None):
            continue
            
        deduped_lines.append(line)
        prev_line = line
    
    # Clean up trailing empty lines
    while deduped_lines and not deduped_lines[-1].strip():
        deduped_lines.pop()
    
    return '\n'.join(deduped_lines)

def route_llm_call(task_type: str, prompt: str, max_tokens: Optional[int] = None) -> str:
    """Route LLM calls to appropriate provider based on task type.
    
    Args:
        task_type: Type of task to route ('pitch_block', 'regenerate', 'score', 'clarify_question', 'generate_email')
        prompt: The prompt to send to the LLM
        max_tokens: Optional maximum number of tokens for response
        
    Returns:
        str: The deduplicated LLM response
    """
    if task_type in ["pitch_block", "regenerate", "score"]:
        response = call_openai(prompt, max_tokens=max_tokens)
    elif task_type in ["clarify_question", "generate_email"]:
        response = call_claude(prompt, max_tokens=max_tokens)
    else:
        raise ValueError(f"Unknown task type: {task_type}")
    
    return deduplicate_response(response)
