import api from "./api";

// POST /api/v1/analyze
export const analyzeSecurityFinding = async (data) => {
  const response = await api.post("/analyze", data);
  return response.data;
};

// GET /api/v1/analyze/history
export const getAnalysisHistory = async () => {
  const response = await api.get("/analyze/history");
  return response.data;
};

// GET /api/v1/analyze/search?keyword=
export const searchAnalysisHistory = async (keyword) => {
  const response = await api.get("/analyze/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

// GET /api/v1/analyze/{id}
export const getAnalysisById = async (id) => {
  const response = await api.get(`/analyze/${id}`);
  return response.data;
};

// DELETE /api/v1/analyze/{id}
export const deleteAnalysis = async (id) => {
  const response = await api.delete(`/analyze/${id}`);
  return response.data;
};