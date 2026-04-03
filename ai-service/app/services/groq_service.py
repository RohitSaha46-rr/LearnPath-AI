import requests
from app.config.settings import GROQ_API_KEY

def call_groq(prompt: str):
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}"
            },
            json={
                "model": "groq/compound",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7,
                "max_tokens": 2000
            },
            timeout=30
        )

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()["choices"][0]["message"]["content"]

    except Exception as e:
        print("Groq Error:", e)
        raise e