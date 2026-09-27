package com.example.projecti.controller;

import com.example.projecti.entity.CompanyInfo;
import com.example.projecti.repository.CompanyInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private CompanyInfoRepository repository;

    @GetMapping
    public CompanyInfo getStory() {
        if (repository.count() == 0) {
            CompanyInfo info = new CompanyInfo("Наша история", "Мы — молодая компания, созданная в 2026 году для вашего комфорта.");
            return repository.save(info); // Сохраняем в таблицу, которую видит Spring
        }
        return repository.findAll().get(0);
    }
}