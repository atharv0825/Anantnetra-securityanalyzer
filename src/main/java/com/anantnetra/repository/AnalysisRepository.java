package com.anantnetra.repository;

import com.anantnetra.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
    @Query("""
            SELECT a FROM Analysis a
            WHERE LOWER(a.organization) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(a.asset) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(a.finding) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(a.businessPriority) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<Analysis> search(@Param("keyword") String keyword);
}