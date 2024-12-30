package com.luizgasparetto.universitysystem.repository;

import com.luizgasparetto.universitysystem.domain.enrollment.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(UUID userId);
    List<Enrollment> findByCourseId(UUID courseId);
}
