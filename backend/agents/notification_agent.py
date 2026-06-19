def notification_agent(state):

    print(
        f"Loan {state['decision']} for {state['name']}"
    )

    return state