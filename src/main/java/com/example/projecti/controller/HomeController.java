package com.example.projecti.controller;

import com.example.projecti.dto.CategoryDto;
import com.example.projecti.dto.ProductShortDto;
import com.example.projecti.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HomeController {

    private final HomeService homeService;
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getCategories() {
        return ResponseEntity.ok(homeService.getAllCategories());
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductShortDto>> getHomeProducts() {
        return ResponseEntity.ok(homeService.getHomeProducts());
    }
}