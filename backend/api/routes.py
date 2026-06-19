from fastapi import APIRouter

from api.models import LoanApplication
from graph.loan_graph import graph

router = APIRouter()


@router.post("/apply-loan")
def apply_loan(application: LoanApplication):

    result = graph.invoke(application.model_dump())

    return {
    "credit_status": result["credit_status"],
    "risk": result["risk"],
    "risk_reason": result["risk_reason"],
    "decision": result["decision"],
    "decision_reason": result["decision_reason"]
    }