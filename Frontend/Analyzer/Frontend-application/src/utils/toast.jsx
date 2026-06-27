import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const toastStyle = {
  color: "#fff",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "16px",
  padding: "12px 16px",
  boxShadow: "0 8px 32px rgba(31,38,135,0.2)",
};

export const showSuccess = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`d-flex align-items-center gap-3 ${
          t.visible ? "animate__animated animate__fadeInRight" : ""
        }`}
        style={{
          ...toastStyle,
          background: "rgba(34,197,94,0.15)",
          border: "1px solid #22C55E",
        }}
      >
        <FaCheckCircle
          size={20}
          style={{ color: "#22C55E" }}
        />
        <span>{message}</span>
      </div>
    ),
    {
      duration: 3000,
    }
  );
};

export const showError = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`d-flex align-items-center gap-3 ${
          t.visible ? "animate__animated animate__fadeInRight" : ""
        }`}
        style={{
          ...toastStyle,
          background: "rgba(239,68,68,0.15)",
          border: "1px solid #EF4444",
        }}
      >
        <FaTimesCircle
          size={20}
          style={{ color: "#EF4444" }}
        />
        <span>{message}</span>
      </div>
    ),
    {
      duration: 3000,
    }
  );
};

export const showInfo = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`d-flex align-items-center gap-3 ${
          t.visible ? "animate__animated animate__fadeInRight" : ""
        }`}
        style={{
          ...toastStyle,
          background: "rgba(79,70,229,0.15)",
          border: "1px solid #4F46E5",
        }}
      >
        <FaInfoCircle
          size={20}
          style={{ color: "#4F46E5" }}
        />
        <span>{message}</span>
      </div>
    ),
    {
      duration: 3000,
    }
  );
};