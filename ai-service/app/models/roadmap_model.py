from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    topic: str
    level: str = "beginner"
    