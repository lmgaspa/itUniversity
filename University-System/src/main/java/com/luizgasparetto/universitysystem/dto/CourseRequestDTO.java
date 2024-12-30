package com.luizgasparetto.universitysystem.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CourseRequestDTO(
        @NotBlank String name,
        @NotBlank String description,
        @NotBlank String imageUrl
) {}


