package com.example.projecti.controller;

import com.example.projecti.entity.Order;
import com.example.projecti.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping("/orders")
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        orderRepository.save(order); // Сохраняем заказ в БД!
        return ResponseEntity.ok("Заказ успешно оформлен!");
    }
}