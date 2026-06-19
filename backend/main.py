from graph.loan_graph import graph

initial_state = {
    "name": "Rahul",
    "age": 28,

    "income": 60000,
    "loan_amount": 300000,
    "credit_score": 750,

    "employment_type": "Salaried",
    "existing_loans": 1,
    "monthly_expenses": 15000
}

result = graph.invoke(initial_state)

print("\nFinal Result:\n")
print(result)