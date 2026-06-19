A clean README for your project should focus on what you actually built and avoid sections that don't exist (database, deployment, live link, etc.).

# Bank MSA - AI Loan Approval System

## Description

Bank MSA is an AI-powered Loan Approval System built using a Multi-Agent System Architecture (MSA).

The system evaluates loan applications through multiple specialized agents that work together to analyze customer information, assess risk, make approval decisions, and generate explainable responses.

Instead of relying on a single rule-based workflow, the application uses AI-powered agents orchestrated through LangGraph to simulate how different banking departments collaborate during the loan approval process.

## Features

* Multi-Agent System Architecture using LangGraph
* AI-powered loan risk assessment using Groq LLM
* AI-driven loan approval and rejection decisions
* Explainable risk analysis and decision reasoning
* Conditional workflow routing based on applicant risk
* REST API built with FastAPI
* Interactive frontend built with React
* Real-time frontend-backend integration
* Responsive banking-style user interface

## Architecture

Frontend (React)
|
v
FastAPI Backend
|
v
LangGraph Workflow
|
+-- Customer Agent
|
+-- Credit Agent
|
+-- Risk Agent (Groq AI)
|
+-- Decision Agent
|
+-- Reject Agent
|
+-- Notification Agent

## Tech Stack

Layer - Technology

* Frontend - React, Vite, Axios, CSS
* Backend - FastAPI, Python, Uvicorn
* Agent Framework - LangGraph
* AI - Groq LLM
* API Testing - Swagger UI

## Installation

### Clone Repository

```bash
git clone https://github.com/dsindhusha/Bank_MSA.git

cd Bank_MSA
```

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a .env file:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the backend server:

```bash
uvicorn app:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Project Structure

```text
Bank_MSA/
|
|- backend/
|  |
|  |- agents/
|  |  |- customer_agent.py
|  |  |- credit_agent.py
|  |  |- risk_agent.py
|  |  |- decision_agent.py
|  |  |- reject_agent.py
|  |  |- notification_agent.py
|  |
|  |- api/
|  |- graph/
|  |- llm/
|  |- app.py
|  |- state.py
|  |- requirements.txt
|
|- frontend/
|  |
|  |- src/
|  |  |- App.jsx
|  |  |- App.css
|  |
|  |- package.json
|
|- README.md
```

## User Flow

Loan Application Form
|
Customer Agent
|
Credit Agent
|
Risk Analysis Agent
|
+-----------------------+
|                       |
| Risk = High           |
|                       |
v                       v
Reject Agent      Decision Agent
|                 |
+--------+--------+
|
Notification Agent
|
Final Result

## Agent Responsibilities

### Customer Agent

* Receives customer application data
* Validates loan request information

### Credit Agent

* Evaluates applicant credit score
* Classifies borrower creditworthiness

### Risk Agent

* Uses Groq AI to assess repayment risk
* Generates risk explanations

### Decision Agent

* Uses AI to determine approval outcome
* Generates approval reasoning

### Reject Agent

* Automatically rejects high-risk applications

### Notification Agent

* Returns final application outcome

## API Endpoint

### Apply Loan

Method

```text
POST
```

Endpoint

```text
/apply-loan
```

Sample Request

```json
{
  "name": "Rahul Sharma",
  "age": 28,
  "income": 60000,
  "loan_amount": 300000,
  "credit_score": 750,
  "employment_type": "Salaried",
  "existing_loans": 1,
  "monthly_expenses": 15000
}
```

## Sample Response

```json
{
  "credit_status": "Excellent",
  "risk": "Medium",
  "risk_reason": "The applicant demonstrates good repayment capability with manageable risk.",
  "decision": "Approved",
  "decision_reason": "Strong credit profile and stable income support approval."
}
```
