package com.anantnetra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AnalyzeResponse {

    private String businessPriority;

    private String whyImportant;

    private String recommendedAction;

    private String suggestedTimeline;
}