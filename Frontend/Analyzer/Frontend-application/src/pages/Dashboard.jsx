import { useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import AnalysisForm from "../components/AnalysisForm";
import AnalysisCard from "../components/AnalysisCard";

function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <>
      <AnimatedBackground />

      <div
        className="container py-5 position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">
            Security Risk Analyzer
          </h1>

          <p className="text-success fs-5">
            Analyze security findings and generate
            AI-powered business recommendations.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">

            <AnalysisForm setResult={setResult} />

            {result && (
              <div className="mt-4">
                <AnalysisCard result={result} />
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;