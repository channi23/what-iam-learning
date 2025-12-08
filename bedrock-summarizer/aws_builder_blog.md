# Bedrock Summarizer: Instant AI Summaries

**Problem & Solution**
Information overload is a productivity killer. I built **Bedrock Summarizer**, a serverless app using Amazon Bedrock & Streamlit that instantly turns long text into concise summaries, saving hours for students and professionals.

**Technical Implementation**
*   **Frontend:** Streamlit (Python) for rapid UI.
*   **AI:** Amazon Bedrock (Claude 3 Haiku) for fast, serverless inference.
*   **Backend:** Boto3 SDK for secure AWS integration.
**Flow:** User Input → Boto3 → Bedrock API → Summary. No GPU management needed.

**Scaling Strategy**
*   **Current:** Lightweight container.
*   **Future:** AWS App Runner for auto-scaling and Redis for caching frequent queries.

**Visuals**
*(See attached Architecture Diagram & Streamlit UI Screenshots)*

**Code**
```python
import boto3
client = boto3.client("bedrock-runtime", region_name="us-east-1")
# Invoke Claude 3 Haiku
resp = client.converse(
    modelId="anthropic.claude-3-haiku-20240307-v1:0",
    messages=[{"role":"user","content":[{"text":prompt}]}]
)
print(resp["output"]["message"]["content"][0]["text"])
```
