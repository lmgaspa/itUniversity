package com.luizgasparetto.universitysystem.dto;

import java.util.UUID;

public record EnrollmentRequestDTO(UUID userId, UUID courseId) {
}


