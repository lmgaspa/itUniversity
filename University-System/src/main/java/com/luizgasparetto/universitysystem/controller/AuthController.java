package com.luizgasparetto.universitysystem.controller;

import com.luizgasparetto.universitysystem.Repository.UserRepository;
import com.luizgasparetto.universitysystem.domain.user.User;
import com.luizgasparetto.universitysystem.dto.LoginRequestDTO;
import com.luizgasparetto.universitysystem.dto.RegisterRequestDTO;
import com.luizgasparetto.universitysystem.dto.ResponseDTO;
import com.luizgasparetto.universitysystem.dto.UpdateUserDTO;
import lombok.RequiredArgsConstructor;
import com.luizgasparetto.universitysystem.infra.security.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.repository.findByEmail(body.email());

        if (user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable UUID id, @RequestBody UpdateUserDTO body) {
        User user = this.repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(body.name());
        user.setPassword(passwordEncoder.encode(body.password()));
        user.setEmail(body.email());
        this.repository.save(user);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "User updated successfully"));
    }

    @PatchMapping("/update-name/{id}")
    public ResponseEntity updateName(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        User user = this.repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        String newName = body.get("name");
        if (newName == null || newName.isEmpty()) {
            return ResponseEntity.badRequest().body("New name must be provided");
        }

        user.setName(newName);
        this.repository.save(user);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "User name updated successfully"));
    }

    @PatchMapping("/update-email/{id}")
    public ResponseEntity updateEmail(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        User user = this.repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        String newEmail = body.get("email");
        if (newEmail == null || newEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("New email must be provided");
        }

        user.setEmail(newEmail);
        this.repository.save(user);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "User email updated successfully"));
    }

    @PatchMapping("/update-password/{id}")
    public ResponseEntity updatePassword(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        User user = this.repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        String newPassword = body.get("password");
        if (newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("New password must be provided");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        this.repository.save(user);

        return ResponseEntity.ok(new ResponseDTO(user.getName(), "User password updated successfully"));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable UUID id) {
        User user = this.repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        this.repository.delete(user);
        return ResponseEntity.ok("User deleted successfully");
    }
}
