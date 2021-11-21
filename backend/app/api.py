from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.events import router as events_router


app = FastAPI(
    title="Garuda",
    description="My Garuda API",
    version="1.0.0"

)

# Adding CORS middleware allowing API access
# from any domain on the internet
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events_router)
