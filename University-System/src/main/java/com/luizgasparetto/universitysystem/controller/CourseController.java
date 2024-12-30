package com.luizgasparetto.universitysystem.controller;

import com.luizgasparetto.universitysystem.repository.CourseRepository;
import com.luizgasparetto.universitysystem.domain.course.Course;
import com.luizgasparetto.universitysystem.dto.CourseRequestDTO;
import com.luizgasparetto.universitysystem.dto.ResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
@Validated
public class CourseController {
    private final CourseRepository courseRepository;

    @PostMapping("/create-course")
    public ResponseEntity<ResponseDTO> createCourse(@Valid @RequestBody CourseRequestDTO body) {
        Course newCourse = new Course();
        newCourse.setName(body.name());
        newCourse.setDescription(body.description());
        newCourse.setStartDate(body.startDate());
        newCourse.setEndDate(body.endDate());
        courseRepository.save(newCourse);

        return ResponseEntity.ok(new ResponseDTO(newCourse.getName(), "Course created successfully"));
    }

    @GetMapping("/find-all-courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/find-course/{id}")
    public ResponseEntity getCourseById(@PathVariable UUID id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        return ResponseEntity.ok(course);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updateCourse(@PathVariable UUID id, @Valid @RequestBody CourseRequestDTO body) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));

        course.setName(body.name());
        course.setDescription(body.description());
        course.setStartDate(body.startDate());
        course.setEndDate(body.endDate());
        courseRepository.save(course);

        return ResponseEntity.ok(new ResponseDTO(course.getName(), "Course updated successfully"));
    }

    @DeleteMapping("/delete-course/{id}")
    public ResponseEntity deleteCourse(@PathVariable UUID id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        courseRepository.delete(course);
        return ResponseEntity.ok("Course deleted successfully");
    }
}
