from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.events import router as events_router

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.tasks.notificataions import notificationTask, removeOldiesTask

app = FastAPI(
    title="Sangham",
    description="Sangham is a volunteer event board that minimize the volunteering experience for both the volunteer and event organizers.",
    version="1.0.0"
)

@app.on_event("startup")
async def load_schedule_or_create_blank():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(notificationTask, 'interval', minutes=1)
    scheduler.add_job(removeOldiesTask, 'interval', minutes=1)
    scheduler.start()

# Adding CORS middleware allowing API access
# from any domain on the internet
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://0.0.0.0:5000","http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events_router)
