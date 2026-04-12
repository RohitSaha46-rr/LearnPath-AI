from fastapi import APIRouter
from app.models.roadmap_model import RoadmapRequest
from app.services.groq_service import call_groq
import json
import re

router = APIRouter()

@router.post("/generate")
async def generate_roadmap(request: RoadmapRequest):
    duration_map = {"beginner": "2 months", "intermediate": "3 months", "advanced": "4 months"}
    duration = duration_map.get(request.level, "2 months")

    try:
        print(f"🔍 Generating roadmap for: {request.topic} | Level: {request.level} | Duration: {duration}")
        
        prompt = f"""
Create a {duration} learning roadmap for {request.topic} at {request.level} level with EXACTLY 10 nodes.
Return ONLY valid JSON, no extra text, no markdown, no explanation.
Format:
{{
  "title": "Learning {request.topic}",
  "nodes": [
    {{"id": "1", "title": "Node title", "description": "What to learn", "difficulty": "easy", "estimatedTime": 4, "week": 1}},
    {{"id": "2", "title": "Node title", "description": "What to learn", "difficulty": "easy", "estimatedTime": 4, "week": 1}},
    {{"id": "3", "title": "Node title", "description": "What to learn", "difficulty": "easy", "estimatedTime": 5, "week": 2}},
    {{"id": "4", "title": "Node title", "description": "What to learn", "difficulty": "medium", "estimatedTime": 5, "week": 2}},
    {{"id": "5", "title": "Node title", "description": "What to learn", "difficulty": "medium", "estimatedTime": 6, "week": 3}},
    {{"id": "6", "title": "Node title", "description": "What to learn", "difficulty": "medium", "estimatedTime": 6, "week": 3}},
    {{"id": "7", "title": "Node title", "description": "What to learn", "difficulty": "hard", "estimatedTime": 7, "week": 4}},
    {{"id": "8", "title": "Node title", "description": "What to learn", "difficulty": "hard", "estimatedTime": 7, "week": 4}},
    {{"id": "9", "title": "Node title", "description": "What to learn", "difficulty": "hard", "estimatedTime": 8, "week": 5}},
    {{"id": "10", "title": "Node title", "description": "What to learn", "difficulty": "hard", "estimatedTime": 8, "week": 5}}
  ]
}}
Replace all "Node title" and "What to learn" with real {request.level}-level content for {request.topic} spread across {duration}.
Return ONLY the JSON object.
        """

        ai_text = call_groq(prompt)
        print(f"✅ AI Response received, length: {len(ai_text)}")
        
        # Clean response
        ai_text = ai_text.replace("```json", "").replace("```", "").strip()
        
        ai_data = json.loads(ai_text)
        print(f"✅ JSON parsed with {len(ai_data.get('nodes', []))} nodes")
        
        return {
            "success": True,
            "roadmap": ai_data,
            "message": "Roadmap generated successfully with Groq"
        }
        
    except Exception as e:
        print(f"🚨 Error: {e}")
        return {
            "success": True,
            "roadmap": {
                "title": f"Learn {request.topic}",
                "nodes": [
                    {
                        "id": "1",
                        "title": f"Start {request.topic}",
                        "description": "Basic concepts and setup",
                        "difficulty": "easy",
                        "estimatedTime": 4,
                        "week": 1
                    }
                ]
            },
            "message": "Used fallback roadmap"
        }
    
@router.get("/")
async def root():
    return {"message": "AI Roadmap API is running", "model": "Groq"}
