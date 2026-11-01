package com.example.projecti.service;

import com.example.projecti.dto.AuthResponse;
import com.example.projecti.dto.LoginRequest;
import com.example.projecti.dto.RegisterRequest;
import com.example.projecti.entity.Role;
import com.example.projecti.entity.User;
import com.example.projecti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email уже зарегистрирован!");
        }

        Role userRole = Role.ROLE_BUYER;
        if ("SELLER".equalsIgnoreCase(request.getRole())) {
            userRole = Role.ROLE_SELLER;
        }

        User user = User.builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .build();

        userRepository.save(user);
        return "Пользователь успешно зарегистрирован";
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Неверный пароль");
        }

        String token = "mock-jwt-token-for-" + user.getEmail();

        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }
}