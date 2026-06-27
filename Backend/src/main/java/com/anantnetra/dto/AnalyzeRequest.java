package com.anantnetra.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyzeRequest {

    @NotBlank(message = "Organization is required")
    private String organization;

    @NotBlank(message = "Asset is required")
    private String asset;

    @NotBlank(message = "Security finding is required")
    private String finding;

    @NotBlank(message = "Severity is required")
    private String severity;
}