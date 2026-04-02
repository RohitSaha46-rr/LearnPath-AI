# from app.services.groq_service import call_groq
# import re
# import json

# prompt = f"""
# Create a 1-month roadmap for React.
# Return ONLY JSON:
# {{
#   "title": "Roadmap for React",
#   "nodes": [
#     {{
#       "id": "1",
#       "title": "Topic",
#       "description": "Details",
#       "week": 1
#     }}
#   ]
# }}
# """

# try:
#     ai_text = call_groq(prompt)
#     print("AI Text:", repr(ai_text))

#     # Extract JSON from possible markdown
#     json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', ai_text, re.DOTALL)
#     if json_match:
#         ai_text = json_match.group(1)
#     else:
#         # Remove any 'json' word and strip
#         ai_text = ai_text.replace("json", "").strip()

#     print("After processing:", repr(ai_text))
#     data = json.loads(ai_text)
#     print("Parsed:", data)
# except Exception as e:
#     print("Error:", e)