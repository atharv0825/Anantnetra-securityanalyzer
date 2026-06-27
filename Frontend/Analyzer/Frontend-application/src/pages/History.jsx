import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import HistoryCard from "../components/HistoryCard";
import {
  getAnalysisHistory,
  deleteAnalysis,
} from "../api/analysisApi";

import {
  showSuccess,
  showError,
  showInfo,
} from "../utils/toast";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getAnalysisHistory();

      console.log("History API Response:", data);

      setHistory(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
      setHistory([]);
      showError("Failed to load analysis history");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteAnalysis(id);

      setHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );

      // Success Toast
      showSuccess("Analysis deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);

      // Error Toast
      showError("Failed to delete analysis");
    }
  };

  return (
    <>
      <AnimatedBackground />

      <div
        className="container py-5 position-relative"
        style={{ zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-black fw-bold mb-2">
            Analysis History
          </h2>

          <p
            className="mb-4 fw-medium"
            style={{ color: "#22C55E" }}
          >
            View all previous security analyses.
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white mt-5"
          >
            <div
              className="spinner-border text-#22C55E"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3 text-#22C55E">
              Loading analyses...
            </p>
          </motion.div>
        ) : history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card border-0 rounded-4 p-5 text-center"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:
                "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <h5 className="text-dark fw-bold">
              No analyses found
            </h5>

            <p className="text-muted mb-0">
              Analyze a security finding to get started.
            </p>
          </motion.div>
        ) : (
          history.map((item, index) => (
            <HistoryCard
              key={item.id}
              item={item}
              index={index}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
}

export default History;