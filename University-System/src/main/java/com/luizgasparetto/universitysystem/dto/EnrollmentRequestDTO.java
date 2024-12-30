package com.luizgasparetto.universitysystem.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record EnrollmentRequestDTO(
        @NotNull(message = "User ID is required") UUID userId,
        @NotNull(message = "Course ID is required") UUID courseId
) {}



