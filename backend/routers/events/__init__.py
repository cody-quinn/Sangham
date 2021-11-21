from fastapi import APIRouter

from .events import router as events_router
from .images import router as images_router



# Defining router for all Authentication endpoints
router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={
        400: {"description": "Malformed Request"},
        401: {"description": "Unauthorized"},
        403: {"description": "Forbidden"},
        404: {"description": "Content not found"},
    },
)

# Adding all "routers" (endpoints) to the router
router.include_router(events_router)
router.include_router(images_router)