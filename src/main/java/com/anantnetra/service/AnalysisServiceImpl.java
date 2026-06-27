package com.anantnetra.service;

import com.anantnetra.dto.AnalyzeRequest;
import com.anantnetra.dto.AnalyzeResponse;
import com.anantnetra.dto.HistoryResponse;
import com.anantnetra.entity.Analysis;
import com.anantnetra.exception.ResourceNotFoundException;
import com.anantnetra.repository.AnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService {

    private final GeminiService geminiService;
    private final AnalysisRepository analysisRepository;


    @Override
    public AnalyzeResponse analyze(AnalyzeRequest request) {

        AnalyzeResponse response =
                geminiService.analyze(request);

        Analysis analysis = Analysis.builder()
                .organization(request.getOrganization())
                .asset(request.getAsset())
                .finding(request.getFinding())
                .severity(request.getSeverity())
                .businessPriority(response.getBusinessPriority())
                .whyImportant(response.getWhyImportant())
                .recommendedAction(response.getRecommendedAction())
                .suggestedTimeline(response.getSuggestedTimeline())
                .createdAt(LocalDateTime.now())
                .build();

        analysisRepository.save(analysis);

        return response;
    }

    @Override
    public List<HistoryResponse> getHistory() {

        return analysisRepository.findAll(
                        Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(analysis -> HistoryResponse.builder()
                        .id(analysis.getId())
                        .organization(analysis.getOrganization())
                        .asset(analysis.getAsset())
                        .finding(analysis.getFinding())
                        .severity(analysis.getSeverity())
                        .businessPriority(analysis.getBusinessPriority())
                        .createdAt(analysis.getCreatedAt())
                        .build())
                .toList();
    }

    @Override
    public List<HistoryResponse> search(String keyword) {

        return analysisRepository.search(keyword)
                .stream()
                .map(analysis -> HistoryResponse.builder()
                        .id(analysis.getId())
                        .organization(analysis.getOrganization())
                        .asset(analysis.getAsset())
                        .finding(analysis.getFinding())
                        .severity(analysis.getSeverity())
                        .businessPriority(analysis.getBusinessPriority())
                        .createdAt(analysis.getCreatedAt())
                        .build())
                .toList();
    }

    @Override
    public void delete(Long id) {

        Analysis analysis = analysisRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Analysis not found with id: " + id));

        analysisRepository.delete(analysis);
    }
}