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

                    Analyze:

                    Organization: %s
                    Asset: %s
                    Finding: %s
                    Severity: %s

                    Return ONLY valid JSON.

                    {
                      "businessPriority":"",
                      "whyImportant":"",
                      "recommendedAction":"",
                      "suggestedTimeline":""
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