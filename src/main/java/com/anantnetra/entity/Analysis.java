package com.anantnetra.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "analysis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String organization;

    private String asset;

    private String finding;

    private String severity;

    private String businessPriority;

    @Column(columnDefinition = "TEXT")
    private String whyImportant;

    @Column(columnDefinition = "TEXT")
    private String recommendedAction;

    private String suggestedTimeline;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}