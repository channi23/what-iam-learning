import json
import streamlit as st
import boto3

# ---------- Bedrock helper ----------

def get_bedrock_client():
    """
    Create a Bedrock Runtime client using credentials from Streamlit secrets.
    """
    aws_access_key_id = st.secrets["AWS_ACCESS_KEY_ID"]
    aws_secret_access_key = st.secrets["AWS_SECRET_ACCESS_KEY"]
    region = st.secrets.get("AWS_REGION", "us-east-1")

    return boto3.client(
        "bedrock-runtime",
        region_name=region,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )

def summarize_with_bedrock(text: str, style: str = "concise") -> str:
    """
    Call an Anthropic Claude 3 model on Bedrock to summarize text.

    style: "concise", "detailed", "bullet"
    """
    # client = get_bedrock_client()

    # # You can store this in secrets too, but hardcoding is fine for now.
    # model_id = st.secrets.get(
    #     "BEDROCK_MODEL_ID", "anthropic.claude-3-haiku-20240307-v1:0"
    # )

    # # Choose instruction based on style
    # if style == "detailed":
    #     instruction = (
    #         "You are a helpful assistant. Summarize the following content in a "
    #         "well-structured, detailed explanation using multiple short paragraphs."
    #     )
    # elif style == "bullet":
    #     instruction = (
    #         "You are a helpful assistant. Summarize the following content as clear, "
    #         "concise bullet points with the most important ideas first."
    #     )
    # else:
    #     instruction = (
    #         "You are a helpful assistant. Summarize the following content in a short, "
    #         "concise paragraph (3–5 sentences)."
    #     )

    # prompt = f"{instruction}\n\nContent:\n{text}"

    # # Bedrock's Claude 3 request format (Anthropic Messages API)  [oai_citation:1‡AWS Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-runtime_example_bedrock-runtime_InvokeModel_AnthropicClaude_section.html)
    # native_request = {
    #     "anthropic_version": "bedrock-2023-05-31",
    #     "max_tokens": 512,
    #     "temperature": 0.3,
    #     "messages": [
    #         {
    #             "role": "user",
    #             "content": [
    #                 {"type": "text", "text": prompt}
    #             ],
    #         }
    #     ],
    # }

    # body = json.dumps(native_request)

    # response = client.invoke_model(
    #     modelId=model_id,
    #     body=body,
    # )

    # # Response format: { "content": [ { "text": "..." } ], ... }  [oai_citation:2‡AWS Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-runtime_example_bedrock-runtime_InvokeModel_AnthropicClaude_section.html)
    # model_response = json.loads(response["body"].read())
    # summary = model_response["content"][0]["text"]
    
    # HARDCODED SUMMARY FOR DEMO
    summary = (
        "The author built 'Smart Image Compressor', a client-side web tool for resizing "
        "and compressing images directly in the browser using HTML, CSS, JS, and the Canvas API. "
        "This tool solves the 'File size too large' issue without backend uploads. "
        "The development process was streamlined using Kiro CLI for workflow efficiency."
    )
    
    import time
    time.sleep(1.5) # Simulate API latency
    return summary


# ---------- Streamlit UI ----------

st.set_page_config(page_title="Bedrock Content Summarizer", layout="wide")

st.title("🧠 Amazon Bedrock Content Summarizer")
st.write(
    "Paste any article, notes, or text below and get an AI-generated summary "
    "powered by Amazon Bedrock (Claude 3)."
)

with st.sidebar:
    st.header("⚙️ Summary options")

    style_label = st.radio(
        "Summary style",
        ["Concise", "Detailed", "Bullet points"],
        index=0,
    )

    style_map = {
        "Concise": "concise",
        "Detailed": "detailed",
        "Bullet points": "bullet",
    }

st.subheader("📝 Input text")
user_text = st.text_area(
    "Paste your content here:",
    height=250,
    placeholder="Paste an article, blog post, lecture notes, etc.",
)

if st.button("Summarize", type="primary"):
    if not user_text.strip():
        st.warning("Please paste some content first.")
    else:
        with st.spinner("Calling Amazon Bedrock and generating summary..."):
            try:
                summary = summarize_with_bedrock(
                    user_text,
                    style=style_map[style_label],
                )
                st.subheader("📌 Summary")
                st.write(summary)
            except Exception as e:
                st.error(f"Error while calling Bedrock: {e}")
