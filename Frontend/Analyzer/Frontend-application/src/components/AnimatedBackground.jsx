import { useEffect, useState } from "react";

const colors = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
];

function Blob({ size, color, duration, delay }) {
  const [position, setPosition] = useState({
    top: Math.random() * 80,
    left: Math.random() * 80,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: Math.random() * 80,
        left: Math.random() * 80,
      });
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        filter: "blur(140px)",
        opacity: 0.35,
        top: `${position.top}%`,
        left: `${position.left}%`,
        transition: `all ${duration}s ease-in-out`,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function AnimatedBackground() {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }

            50% {
              transform: translateY(-40px) scale(1.15);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          zIndex: -1,
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #eef2ff 100%)",
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Blob
            key={index}
            size={250 + Math.random() * 250}
            color={colors[Math.floor(Math.random() * colors.length)]}
            duration={12 + Math.random() * 10}
            delay={Math.random() * 5}
          />
        ))}
      </div>
    </>
  );
}