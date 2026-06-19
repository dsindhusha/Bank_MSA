from typing import TypedDict

class LoanState(TypedDict):
    name: str
    age: int

    income: int
    loan_amount: int
    credit_score: int

    employment_type: str
    existing_loans: int
    monthly_expenses: int

    credit_status: str

    risk: str
    risk_reason: str

    dti_ratio: float

    decision: str
    decision_reason: str