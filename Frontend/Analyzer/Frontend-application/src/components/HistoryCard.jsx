import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaServer,
  FaBug,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";

function HistoryCard({ item, onDelete, index }) {
  const navigate = useNavigate();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "#EF4444";
      case "HIGH":
        return "#F97316";
      case "MEDIUM":
        return "#EAB308";
      default:
        return "#22C55E";
    }
  };

  return (
    <motion.div
      onClick={() => navigate(`/history/${item.id}`)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="card border-0 rounded-4 mb-3"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.15)",
        cursor: "pointer",
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold mb-2">
              <FaBug className="text-danger me-2" />
              {item.finding || item.securityFinding}
            </h5>

            <span
              className="badge px-3 py-2 rounded-pill"
              style={{
                background: `${getSeverityColor(item.severity)}20`,
                color: getSeverityColor(item.severity),
                fontWeight: "600",
              }}
            >
              {item.severity}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-danger btn-sm rounded-circle"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            <FaTrash />
          </motion.button>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <div
              className="p-3 rounded-3 h-100"
              style={{
                background: "rgba(255,255,255,0.15)",
              }}
            >
              <small className="text-muted d-block mb-1">
                Organization
              </small>

              <div className="fw-semibold">
                <FaBuilding className="text-primary me-2" />
                {item.organization}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-3 rounded-3 h-100"
              style={{
                background: "rgba(255,255,255,0.15)",
              }}
            >
              <small className="text-muted d-block mb-1">
                Asset
              </small>

              <div className="fw-semibold">
                <FaServer className="text-success me-2" />
                {item.asset}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-3 rounded-3 h-100"
              style={{
                background: "rgba(255,255,255,0.15)",
              }}
            >
              <small className="text-muted d-block mb-1">
                Date
              </small>

              <div className="fw-semibold">
                <FaCalendarAlt className="text-warning me-2" />
                {new Date(item.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HistoryCard;