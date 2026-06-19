from langgraph.graph import StateGraph, END

from state import LoanState

from agents.customer_agent import customer_agent
from agents.credit_agent import credit_agent
from agents.risk_agent import risk_agent
from agents.decision_agent import decision_agent
from agents.notification_agent import notification_agent
from agents.reject_agent import reject_agent


def route_risk(state: LoanState):
    if state["risk"] == "High":
        return "reject"
    return "decision"


builder = StateGraph(LoanState)

# Nodes
builder.add_node("customer", customer_agent)
builder.add_node("credit", credit_agent)
builder.add_node("risk", risk_agent)
builder.add_node("decision", decision_agent)
builder.add_node("reject", reject_agent)
builder.add_node("notification", notification_agent)

# Entry Point
builder.set_entry_point("customer")

# Normal Flow
builder.add_edge("customer", "credit")
builder.add_edge("credit", "risk")

# Conditional Routing
builder.add_conditional_edges(
    "risk",
    route_risk,
    {
        "reject": "reject",
        "decision": "decision"
    }
)

# Both paths end at notification
builder.add_edge("decision", "notification")
builder.add_edge("reject", "notification")

# End
builder.add_edge("notification", END)

graph = builder.compile()