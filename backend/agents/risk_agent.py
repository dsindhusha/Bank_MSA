import json

from llm.groq_client import llm


def risk_agent(state):

    prompt = f"""
    Analyze this loan application.

    Income: {state['income']}
    Loan Amount: {state['loan_amount']}
    Credit Score: {state['credit_score']}
    Employment Type: {state['employment_type']}
    Existing Loans: {state['existing_loans']}
    Monthly Expenses: {state['monthly_expenses']}

    IMPORTANT:
    Return ONLY JSON.
    Do NOT use markdown.
    Do NOT use ```json.
    Do NOT add any explanation outside JSON.

    Example:

    {{
        "risk": "Low",
        "reason": "Strong repayment capability."
    }}
    """

    response = llm.invoke(prompt)

    raw = response.content.strip()

    # Remove markdown code blocks if Groq adds them
    raw = raw.replace("```json", "")
    raw = raw.replace("```", "")
    raw = raw.strip()

    print("CLEANED JSON:")
    print(raw)

    data = json.loads(raw)

    risk = data["risk"]

    # Normalize risk values
    if risk.lower() == "moderate":
        risk = "Medium"

    state["risk"] = risk
    state["risk_reason"] = data["reason"]

    return state