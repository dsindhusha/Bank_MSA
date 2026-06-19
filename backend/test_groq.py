from llm.groq_client import llm

response = llm.invoke(
    "What is a credit score?"
)

print(response.content)