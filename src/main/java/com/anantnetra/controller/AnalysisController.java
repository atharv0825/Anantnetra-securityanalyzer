package com.anantnetra.controller;

import com.anantnetra.dto.AnalyzeRequest;
import com.anantnetra.dto.AnalyzeResponse;
import com.anantnetra.dto.HistoryResponse;
import com.anantnetra.entity.Analysis;
import com.anantnetra.service.AnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analyze")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    @PostMapping
    public ResponseEntity<AnalyzeResponse> analyze(
            @Valid @RequestBody AnalyzeRequest request) {

        return ResponseEntity.ok(
                analysisService.analyze(request)
        );
    }

    @GetMapping("/history")
    public ResponseEntity<List<HistoryResponse>> getHistory() {

        return ResponseEntity.ok(
                analysisService.getHistory()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<HistoryResponse>> search(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                analysisService.search(keyword)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        analysisService.delete(id);

        return ResponseEntity.ok(
                "Analysis deleted successfully");
    }

}