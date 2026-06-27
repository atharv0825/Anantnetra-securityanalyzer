package com.anantnetra.service;

import com.anantnetra.dto.AnalyzeRequest;
import com.anantnetra.dto.AnalyzeResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final Client client;
    private final ObjectMapper objectMapper;

    public AnalyzeResponse analyze(AnalyzeRequest request) {

        try {

            String prompt = """
                            You are a cybersecurity risk analyst.
                            
                            Analyze the following security finding and return ONLY valid JSON.
                            
                            Organization: %s
                            Asset: %s
                            Finding: %s
                            Severity: %s
                            
                            Rules:
                            1. businessPriority must be ONLY one of:
                               - Critical
                               - High
                               - Medium
                            
                            2. whyImportant must be a short business explanation (max 2 sentences).
                            
                            3. recommendedAction must be a simple plain-text recommendation (max 2 sentences).
                               Do NOT use numbering.
                               Do NOT use bullet points.
                               Do NOT use markdown.
                               Do NOT use lists.
                            
                            4. suggestedTimeline must be ONLY one of:
                               - Immediate
                               - Within 24 Hours
                               - Within 7 Days
                               - Within 30 Days
                            
                            Return ONLY JSON in this format:
                            
                            {
                              "businessPriority":"Critical",
                              "whyImportant":"...",
                              "recommendedAction":"...",
                              "suggestedTimeline":"Immediate"
                            }
                            """
                    .formatted(
                            request.getOrganization(),
                            request.getAsset(),
                            request.getFinding(),
                            request.getSeverity()
                    );

            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-2.5-flash",
                            prompt,
                            null
                    );

            String json = response.text();

            json = json.replace("```json", "")
                    .replace("```", "")
                    .trim();

            return objectMapper.readValue(
                    json,
                    AnalyzeResponse.class
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse Gemini response",
                    e
            );
        }
    }
}