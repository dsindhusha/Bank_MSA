from pydantic import BaseModel


class LoanApplication(BaseModel):
    name: str
    age: int

    income: int
    loan_amount: int
    credit_score: int

    employment_type: str
    existing_loans: int
    monthly_expenses: int