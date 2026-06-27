import { useState } from "react";
import {
  FaBuilding,
  FaServer,
  FaBug,
  FaExclamationTriangle,
  FaSearch,
} from "react-icons/fa";

import {
  showSuccess,
  showError,
  showInfo,
} from "../utils/toast";

import { analyzeSecurityFinding } from "../api/analysisApi";

function AnalysisForm({ setResult }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    organization: "",
    asset: "",
    finding: "",
    severity: "",
  });

  const inputStyle = {
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    padding: "12px",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.organization.trim() ||
      !formData.asset.trim() ||
      !formData.finding.trim() ||
      !formData.severity
    ) {
      showInfo("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeSecurityFinding(formData);

      setResult(response);

      showSuccess("Analysis completed successfully");

      setFormData({
        organization: "",
        asset: "",
        finding: "",
        severity: "",
      });
    } catch (error) {
      console.error("Analysis Error:", error);

      showError("AI Service Unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card border-0 rounded-4"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.15)",
      }}
    >
      <div className="card-body p-4 p-md-5">
        <h3 className="fw-bold mb-4 text-center">
          Security Risk Analysis
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FaBuilding className="me-2 text-primary" />
              Organization Name
            </label>

            <input
              type="text"
              name="organization"
              className="form-control"
              value={formData.organization}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter organization name"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FaServer className="me-2 text-success" />
              Asset Name
            </label>

            <input
              type="text"
              name="asset"
              className="form-control"
              value={formData.asset}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter asset name"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FaBug className="me-2 text-danger" />
              Security Finding
            </label>

            <textarea
              rows="4"
              name="finding"
              className="form-control"
              value={formData.finding}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Describe the security finding"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FaExclamationTriangle className="me-2 text-warning" />
              Severity
            </label>

            <select
              name="severity"
              className="form-select"
              value={formData.severity}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Severity</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 py-3 fw-semibold rounded-3"
            style={{
              background:
                "linear-gradient(135deg,#4F46E5,#7C3AED)",
              border: "none",
            }}
          >
            <FaSearch className="me-2" />
            {loading
              ? "Analyzing..."
              : "Analyze Security Finding"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnalysisForm;