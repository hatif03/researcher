from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv
from datetime import datetime

# Import routers
from app.routers import research, auth, users

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Researcher - Your AI Research Assistant",
    description="Your platform for conducting deep research and generating comprehensive reports",
    version="0.1.0"
)

# Configure CORS
origins = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/")
async def root():
    print("Root endpoint was called!")
    return {"message": "Welcome to DeepR API"}

@app.get("/health")
async def health_check():
    print("Health check endpoint was called!")
    return {"status": "healthy"}

@app.get("/api/test")
async def test_endpoint():
    """Test endpoint that doesn't require authentication"""
    print("Test endpoint was called!")
    return {
        "message": "Test endpoint successful", 
        "success": True,
        "timestamp": str(datetime.now())
    } 