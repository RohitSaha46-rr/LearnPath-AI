from fastapi import APIRouter
from app.models.roadmap_model import RoadmapRequest
from app.services.groq_service import call_groq
import json
import re

router = APIRouter()

@router.post("/generate")
async def generate_roadmap(request: RoadmapRequest):
    try:
        print(f"🔍 Generating roadmap for: {request.topic}")
        
        prompt = f"""
        Create a comprehensive 1-month learning roadmap for {request.topic} for beginners.
        Return ONLY valid JSON in this format:
        {{
          "title": "Roadmap for {request.topic}",
          "nodes": [
            {{
              "id": "1",
              "title": "Topic name",
              "description": "Detailed description of what to learn",
              "difficulty": "easy",
              "estimatedTime": 4,
              "week": 1
            }}
          ]
        }}
        
        Create 8-12 detailed nodes covering all essential {request.topic} topics.
        Make it practical and progressive.
        Return ONLY the JSON without any other text.
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
