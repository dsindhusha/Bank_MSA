import json

from llm.groq_client import llm


def decision_agent(state):

    prompt = f"""
    You are a senior banking officer.

    Credit Status: {state['credit_status']}
    Risk Level: {state['risk']}
    Risk Reason: {state['risk_reason']}

    IMPORTANT:
    Return ONLY JSON.

    Example:

    {{
        "decision": "Approved",
        "reason": "Strong repayment capability."
    }}
    """

    response = llm.invoke(prompt)

    raw = response.content.strip()

    # Remove markdown code blocks if Groq adds them
    raw = raw.replace("```json", "")
    raw = raw.replace("```", "")
    raw = raw.strip()

    print("========== DECISION CLEANED JSON ==========")
    print(raw)
    print("===========================================")

    data = json.loads(raw)

    decision = data["decision"]

    if "approved" in decision.lower():
        decision = "Approved"
    elif "reject" in decision.lower():
        decision = "Rejected"

    state["decision"] = decision
    state["decision_reason"] = data["reason"]

    return state