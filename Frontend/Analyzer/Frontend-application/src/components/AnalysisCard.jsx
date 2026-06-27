import {
  FaFlag,
  FaInfoCircle,
  FaTools,
  FaClock,
} from "react-icons/fa";

function AnalysisCard({ result }) {
  if (!result) return null;

  const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
      case "CRITICAL":
        return "danger";
      case "HIGH":
        return "warning";
      case "MEDIUM":
        return "primary";
      default:
        return "success";
    }
  };

  return (
    <div
      className="card border-0 rounded-4 mt-4"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.15)",
      }}
    >
      <div className="card-body p-4">
        <h3 className="fw-bold mb-4">
          AI Analysis Result
        </h3>

        <div className="mb-4">
          <h5 className="fw-bold">
            <FaFlag className="me-2 text-danger" />
            Business Priority
          </h5>

          <span
            className={`badge bg-${getPriorityColor(
              result.businessPriority
            )} px-3 py-2`}
          >
            {result.businessPriority}
          </span>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">
            <FaInfoCircle className="me-2 text-primary" />
            Why Important
          </h5>

          <p className="text-muted">
            {result.whyImportant}
          </p>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">
            <FaTools className="me-2 text-success" />
            Recommended Action
          </h5>

          <p className="text-muted">
            {result.recommendedAction}
          </p>
        </div>

        <div>
          <h5 className="fw-bold">
            <FaClock className="me-2 text-warning" />
            Suggested Timeline
          </h5>

          <p className="text-muted">
            {result.suggestedTimeline}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalysisCard;