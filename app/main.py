from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CMMS API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to CMMS API"}

# Import and include routers
# from app.api.endpoints import assets, work_orders, users, maintenance

# app.include_router(assets.router, prefix="/api/assets", tags=["assets"])
# app.include_router(work_orders.router, prefix="/api/work-orders", tags=["work-orders"])
# app.include_router(users.router, prefix="/api/users", tags=["users"])
# app.include_router(maintenance.router, prefix="/api/maintenance", tags=["maintenance"])
