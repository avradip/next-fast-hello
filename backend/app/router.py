from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Define a Pydantic model for the request body
class InputData(BaseModel):
    input: str

router = r = APIRouter()

@r.get("/hello/")
def hello():
    return {"output": "Hello World"}

@r.post("/process/")
async def process_data(data: InputData):
    try:
        # Extract input from the request body
        input_text = data.input

        # Process the input
        output_text = f"Hello {input_text}"

        # Return the processed data
        return {"output": output_text}
    except Exception as e:
        # In case of any error, return an HTTPException
        raise HTTPException(status_code=500, detail="Internal Server Error")