from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    topic: str
    duration: str = "1 month"
    level: str = "beginner"