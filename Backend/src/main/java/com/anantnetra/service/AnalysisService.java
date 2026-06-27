package com.anantnetra.service;

import com.anantnetra.dto.AnalyzeRequest;
import com.anantnetra.dto.AnalyzeResponse;
import com.anantnetra.dto.HistoryResponse;

import java.util.List;

public interface AnalysisService {

    AnalyzeResponse analyze(AnalyzeRequest request);

    List<HistoryResponse> getHistory();
    List<HistoryResponse> search(String keyword);
    void delete(Long id);
    HistoryResponse getById(Long id);
}