from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

class Query(BaseModel):
    question: str
    reviews: list[str]

@app.post("/analyze")
def analyze(data: Query):
    try:
        reviews_text = "\n".join(data.reviews)

        prompt = f"""
Answer the question based on these reviews:

Question: {data.question}
Reviews:
{reviews_text}
"""

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        return {
            "result": response.choices[0].message.content
        }

    except Exception as e:
        print("AI ERROR:", str(e))

        # for the time when open ai donst give responese
        answer = "Based on user reviews: "

        if "battery" in data.question.lower():
            answer += "Battery is decent for normal use but may drain faster during heavy tasks like gaming."
        elif "camera" in data.question.lower():
            answer += "Camera performs well in daylight but struggles in low light conditions."
        elif "heat" in data.question.lower():
            answer += "Device may heat during long usage like gaming or charging."
        elif "network" in data.question.lower():
            answer += "Network connectivity is generally stable based on reviews."
        else:
            answer += "Mixed opinions found in reviews."

        return {
            "result": f"{answer}\n\n(Generated using fallback logic due to API limits)"
        }