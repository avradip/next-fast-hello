from app.router import router
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

logger = logging.getLogger("uvicorn.access")
logger.setLevel(logging.INFO)
app = FastAPI()
environment = os.getenv("ENVIRONMENT", "dev")  # Default to 'development' if not set


if environment == "dev":
    logger.setLevel(logging.DEBUG)
    logger = logging.getLogger("uvicorn")
    logger.warning("Running in development mode - allowing CORS for all origins")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    logger = logging.getLogger("uvicorn")
    logger.info("Running in prod, setting origin to morpheus.vecsec.com")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    if environment == "dev":
        uvicorn.run(app="main:app", host="0.0.0.0", reload=True)
    else:
        uvicorn.run(app="main:app", host="0.0.0.0")