import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaBuilding,
    FaServer,
    FaBug,
    FaCalendarAlt,
    FaShieldAlt,
    FaExclamationTriangle,
    FaLightbulb,
    FaTools,
    FaClock,
    FaSpinner,
} from "react-icons/fa";

import { getAnalysisById } from "../api/analysisApi";
import AnimatedBackground from "../components/AnimatedBackground";

function AnalysisView() {
    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalysis();
    }, [id]);

    const fetchAnalysis = async () => {
        try {
            const data = await getAnalysisById(id);
            setAnalysis(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "danger";
            case "HIGH":
                return "warning";
            case "MEDIUM":
                return "info";
            default:
                return "success";
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <FaSpinner
                    className="text-primary mb-3"
                    size={40}
                    style={{
                        animation: "spin 1s linear infinite",
                    }}
                />
                <h4>Loading Analysis...</h4>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="container py-5 text-center">
                <FaExclamationTriangle
                    size={50}
                    className="text-warning mb-3"
                />

                <h4>Analysis Not Found</h4>

                <Link
                    to="/history"
                    className="btn btn-primary mt-3"
                >
                    <FaArrowLeft className="me-2" />
                    Back to History
                </Link>
            </div>
        );
    }

    return (
        <>
            <AnimatedBackground />
            <div className="container py-5">

                <Link
                    to="/history"
                    className="btn btn-outline-primary mb-4"
                >
                    <FaArrowLeft className="me-2" />
                    Back to History
                </Link>

                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                    {/* Header */}
                    <div className="bg-dark text-white p-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">

                            <h2 className="fw-bold mb-2 mb-md-0">
                                <FaBug className="text-danger me-2" />
                                {analysis.finding}
                            </h2>

                            <span
                                className={`badge bg-${getSeverityColor(
                                    analysis.severity
                                )} fs-6 px-3 py-2`}
                            >
                                <FaExclamationTriangle className="me-2" />
                                {analysis.severity}
                            </span>

                        </div>
                    </div>

                    <div className="card-body p-5">

                        {/* Summary Cards */}
                        <div className="row g-4 mb-5">

                            <div className="col-md-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body">
                                        <FaBuilding
                                            size={24}
                                            className="text-primary mb-3"
                                        />
                                        <h6 className="fw-bold">
                                            Organization
                                        </h6>
                                        <p className="mb-0 text-muted">
                                            {analysis.organization}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body">
                                        <FaServer
                                            size={24}
                                            className="text-success mb-3"
                                        />
                                        <h6 className="fw-bold">
                                            Asset
                                        </h6>
                                        <p className="mb-0 text-muted">
                                            {analysis.asset}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body">
                                        <FaCalendarAlt
                                            size={24}
                                            className="text-warning mb-3"
                                        />
                                        <h6 className="fw-bold">
                                            Analysis Date
                                        </h6>
                                        <p className="mb-0 text-muted">
                                            {new Date(
                                                analysis.createdAt
                                            ).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Business Priority */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body">
                                <h5 className="fw-bold text-primary mb-3">
                                    <FaShieldAlt className="me-2" />
                                    Business Priority
                                </h5>

                                <p className="mb-0">
                                    {analysis.businessPriority}
                                </p>
                            </div>
                        </div>

                        {/* Why Important */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body">
                                <h5 className="fw-bold text-danger mb-3">
                                    <FaLightbulb className="me-2" />
                                    Why Is It Important?
                                </h5>

                                <p className="mb-0">
                                    {analysis.whyImportant}
                                </p>
                            </div>
                        </div>

                        {/* Recommended Action */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body">
                                <h5 className="fw-bold text-success mb-3">
                                    <FaTools className="me-2" />
                                    Recommended Action
                                </h5>

                                <p className="mb-0">
                                    {analysis.recommendedAction}
                                </p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body">
                                <h5 className="fw-bold text-warning mb-3">
                                    <FaClock className="me-2" />
                                    Suggested Timeline
                                </h5>

                                <p className="mb-0">
                                    {analysis.suggestedTimeline}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AnalysisView;