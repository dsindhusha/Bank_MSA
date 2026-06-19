import { useState } from "react";
import axios from "axios";
import "./App.css";

const initialFormData = {
  name: "",
  age: "",
  income: "",
  loan_amount: "",
  credit_score: "",
  employment_type: "",
  existing_loans: "",
  monthly_expenses: "",
};

const fields = [
  {
    name: "name",
    label: "Applicant Name",
    type: "text",
    placeholder: "Enter full name",
    icon: "user",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "e.g. 32",
    icon: "calendar",
  },
  {
    name: "income",
    label: "Annual Income",
    type: "number",
    placeholder: "e.g. 850000",
    icon: "wallet",
  },
  {
    name: "loan_amount",
    label: "Loan Amount",
    type: "number",
    placeholder: "e.g. 1200000",
    icon: "money",
  },
  {
    name: "credit_score",
    label: "Credit Score",
    type: "number",
    placeholder: "300 - 900",
    icon: "score",
  },
  {
    name: "employment_type",
    label: "Employment Type",
    type: "select",
    placeholder: "Select employment type",
    icon: "briefcase",
    options: ["Salaried", "Self-Employed", "Business Owner"],
  },
  {
    name: "existing_loans",
    label: "Existing Loans",
    type: "number",
    placeholder: "e.g. 1",
    icon: "file",
  },
  {
    name: "monthly_expenses",
    label: "Monthly Expenses",
    type: "number",
    placeholder: "e.g. 45000",
    icon: "receipt",
  },
];

const workflowSteps = [
  "Customer Agent",
  "Credit Agent",
  "Risk Analysis Agent",
  "Decision Agent",
  "Notification Agent",
];

function Icon({ name }) {
  const icons = {
    bank: (
      <>
        <path d="M3 10h18" />
        <path d="M5 10v8" />
        <path d="M9 10v8" />
        <path d="M15 10v8" />
        <path d="M19 10v8" />
        <path d="M2 18h20" />
        <path d="M12 3 3 8h18Z" />
      </>
    ),
    user: (
      <>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    calendar: (
      <>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    wallet: (
      <>
        <path d="M20 7H5a2 2 0 0 1 0-4h12" />
        <path d="M5 7h15v14H5a2 2 0 0 1-2-2V5" />
        <path d="M16 14h.01" />
      </>
    ),
    money: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 12h.01" />
        <path d="M18 12h.01" />
      </>
    ),
    score: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15l3-4 3 2 5-7" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </>
    ),
    receipt: (
      <>
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}

function validate(values) {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = "Applicant name is required.";
  }

  if (!values.age) {
    nextErrors.age = "Age is required.";
  } else if (Number(values.age) <= 18) {
    nextErrors.age = "Age must be greater than 18.";
  }

  if (!values.income) {
    nextErrors.income = "Income is required.";
  } else if (Number(values.income) <= 0) {
    nextErrors.income = "Income must be greater than 0.";
  }

  if (!values.loan_amount) {
    nextErrors.loan_amount = "Loan amount is required.";
  } else if (Number(values.loan_amount) <= 0) {
    nextErrors.loan_amount = "Loan amount must be greater than 0.";
  }

  if (!values.credit_score) {
    nextErrors.credit_score = "Credit score is required.";
  } else if (
    Number(values.credit_score) < 300 ||
    Number(values.credit_score) > 900
  ) {
    nextErrors.credit_score = "Credit score must be between 300 and 900.";
  }

  if (!values.employment_type) {
    nextErrors.employment_type = "Employment type is required.";
  }

  if (values.existing_loans === "") {
    nextErrors.existing_loans = "Existing loans is required.";
  } else if (Number(values.existing_loans) < 0) {
    nextErrors.existing_loans = "Existing loans cannot be negative.";
  }

  if (values.monthly_expenses === "") {
    nextErrors.monthly_expenses = "Monthly expenses is required.";
  } else if (Number(values.monthly_expenses) < 0) {
    nextErrors.monthly_expenses = "Monthly expenses cannot be negative.";
  }

  return nextErrors;
}

function getBadgeClass(value) {
  const normalizedValue = String(value || "").toLowerCase();

  if (normalizedValue.includes("approved") || normalizedValue.includes("low")) {
    return "badge badge-green";
  }

  if (
    normalizedValue.includes("rejected") ||
    normalizedValue.includes("high")
  ) {
    return "badge badge-red";
  }

  if (normalizedValue.includes("medium")) {
    return "badge badge-orange";
  }

  return "badge badge-blue";
}

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };

    setFormData(nextFormData);
    setServerError("");

    if (errors[name]) {
      setErrors(validate(nextFormData));
    }
  };

  const handleBlur = () => {
    setErrors(validate(formData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setResult(null);
    setServerError("");

    try {
      const response = await axios.post(
        "https://bank-msa-backend.onrender.com/apply-loan",
        {
          ...formData,
          age: Number(formData.age),
          income: Number(formData.income),
          loan_amount: Number(formData.loan_amount),
          credit_score: Number(formData.credit_score),
          existing_loans: Number(formData.existing_loans),
          monthly_expenses: Number(formData.monthly_expenses),
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      setServerError(
        "Unable to connect to the loan analysis service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-section fade-in">
        <div className="hero-content">
          <div className="bank-icon">
            <Icon name="bank" />
          </div>
          <div>
            <h1>AI Loan Approval Multi-Agent System</h1>
            <p>Powered by FastAPI, LangGraph and Groq AI</p>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <form className="loan-form card fade-in" onSubmit={handleSubmit}>
          <div className="section-heading">
            <span className="section-icon">
              <Icon name="file" />
            </span>
            <div>
              <h2>Loan Application</h2>
              <p>Enter applicant details for multi-agent analysis.</p>
            </div>
          </div>

          <div className="form-grid">
            {fields.map((field) => (
              <div className="field-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <div
                  className={`input-shell ${
                    errors[field.name] ? "input-error" : ""
                  }`}
                >
                  <Icon name={field.icon} />
                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      min={field.type === "number" ? "0" : undefined}
                      name={field.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={formData[field.name]}
                      required
                    />
                  )}
                </div>
                {errors[field.name] && (
                  <span className="field-error">{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <button className="submit-button" disabled={loading} type="submit">
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing Application...
              </>
            ) : (
              <>
                Analyze Application
                <Icon name="arrow" />
              </>
            )}
          </button>
        </form>

        <aside className="insight-panel card fade-in">
          <div className="section-heading">
            <span className="section-icon">
              <Icon name="shield" />
            </span>
            <div>
              <h2>Decision Intelligence</h2>
              <p>Every application is routed through dedicated agents.</p>
            </div>
          </div>

          <div className="metric-list">
            <div>
              <span>Validation</span>
              <strong>Client-side checks</strong>
            </div>
            <div>
              <span>Workflow</span>
              <strong>6 AI agents</strong>
            </div>
            <div>
              <span>Output</span>
              <strong>Credit, risk and decision</strong>
            </div>
          </div>
        </aside>
      </section>

      {result && (
        <section className="result-card card fade-in">
          <div className="result-header">
            <div>
              <span className="eyebrow">Analysis Result</span>
              <h2>Loan Decision Summary</h2>
            </div>
            <span className={getBadgeClass(result.decision)}>
              {result.decision}
            </span>
          </div>

          <div className="result-grid">
            <div className="result-item">
              <span>Credit Status</span>
              <strong>{result.credit_status}</strong>
            </div>
            <div className="result-item">
              <span>Risk Level</span>
              <strong className={getBadgeClass(result.risk)}>
                {result.risk}
              </strong>
            </div>
            <div className="result-item result-wide">
              <span>Risk Reason</span>
              <p>{result.risk_reason}</p>
            </div>
            <div className="result-item result-wide">
              <span>Decision Reason</span>
              <p>{result.decision_reason}</p>
            </div>
          </div>
        </section>
      )}

      <section className="workflow-section fade-in">
        <div className="section-heading">
          <span className="section-icon">
            <Icon name="shield" />
          </span>
          <div>
            <h2>How the Multi-Agent System Works</h2>
            <p>
              Each step contributes a focused evaluation before the final
              notification.
            </p>
          </div>
        </div>

        <div className="workflow-grid">
          {workflowSteps.map((step, index) => (
            <article className="workflow-card" key={step}>
              <span>Step {index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
