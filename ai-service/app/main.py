from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import roadmap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roadmap.router, prefix="/api/roadmap")

@app.get("/")
def home():
    return {"message": "FastAPI AI Service Running"}

@app.get("/health")
def health():
    return {"status": "ok"}