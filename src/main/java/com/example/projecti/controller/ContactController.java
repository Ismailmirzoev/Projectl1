package com.example.projecti.controller;

import com.example.projecti.entity.ContactMessage;
import com.example.projecti.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactRepository repository;

    @PostMapping
    public String saveMessage(@RequestBody ContactMessage message) {
        repository.save(message);
        return "Сообщение успешно отправлено!";
    }
}