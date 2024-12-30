package com.luizgasparetto.universitysystem.controller;

import com.luizgasparetto.universitysystem.repository.CourseRepository;
import com.luizgasparetto.universitysystem.repository.EnrollmentRepository;
import com.luizgasparetto.universitysystem.repository.UserRepository;
import com.luizgasparetto.universitysystem.domain.enrollment.Enrollment;
import com.luizgasparetto.universitysystem.dto.EnrollmentRequestDTO;
import com.luizgasparetto.universitysystem.dto.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @PostMapping("/enroll")
    public ResponseEntity enroll(@RequestBody EnrollmentRequestDTO body) {
        var user = userRepository.findById(body.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var course = courseRepository.findById(body.courseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        var existingEnrollment = enrollmentRepository.findByUserId(user.getId())
                .stream()
                .filter(e -> e.getCourse().getId().equals(course.getId()))
                .findFirst();

        if (existingEnrollment.isPresent()) {
            return ResponseEntity.badRequest().body("User already enrolled in this course");
        }

        var enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "Enrolled successfully in " + course.getName()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Enrollment>> getUserEnrollments(@PathVariable UUID userId) {
        var enrollments = enrollmentRepository.findByUserId(userId);
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getCourseEnrollments(@PathVariable UUID courseId) {
        var enrollments = enrollmentRepository.findByCourseId(courseId);
        return ResponseEntity.ok(enrollments);
    }
}

