package com.example.projecti.controller;

import com.example.projecti.dto.AuthResponse;
import com.example.projecti.dto.LoginRequest;
import com.example.projecti.dto.RegisterRequest;
import com.example.projecti.service.AuthService;
import com.example.projecti.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String message = authService.register(request);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest servletRequest) {
        try {
            // 1. Проверяем данные через сервис (пароль и существование юзера)
            AuthResponse authResponse = authService.login(request);

            // 2. Получаем пользователя для настройки сессии Spring Security
            com.example.projecti.entity.User dbUser = userService.findByEmail(request.getEmail());

            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    dbUser.getEmail(),
                    dbUser.getPassword(),
                    java.util.Collections.emptyList()
            );

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            HttpSession session = servletRequest.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            // 3. Возвращаем ответ
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        com.example.projecti.entity.User dbUser = userService.findByEmail(userDetails.getUsername());

        if (dbUser == null) {
            return ResponseEntity.status(404).body("User not found в базе данных");
        }

        Map<String, Object> userData = new HashMap<>();
        userData.put("email", dbUser.getEmail());
        userData.put("firstName", dbUser.getFirstName());
        userData.put("lastName", dbUser.getLastName());
        userData.put("username", dbUser.getUsername());
        userData.put("role", dbUser.getRole());

        return ResponseEntity.ok(userData);
    }
}