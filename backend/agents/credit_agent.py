def credit_agent(state):

    score = state["credit_score"]

    if score >= 750:
        status = "Excellent"

    elif score >= 650:
        status = "Good"

    else:
        status = "Poor"

    if state["existing_loans"] >= 3:
        status = "Risky Borrower"

    state["credit_status"] = status

    print(f"Credit Status: {status}")

    return state