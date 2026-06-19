def reject_agent(state):

    state["decision"] = "Rejected"

    state["decision_reason"] = (
        "Loan application rejected because the applicant was assessed as high risk."
    )

    print("Loan Rejected due to High Risk")

    return state