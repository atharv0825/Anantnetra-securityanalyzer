package com.anantnetra.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class HistoryResponse {

    private Long id;

    private String organization;

    private String asset;

    private String finding;

    private String severity;

    private String businessPriority;

    private LocalDateTime createdAt;
}