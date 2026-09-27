package com.example.projecti.entity;

import jakarta.persistence.*;
import lombok.Data; // Если используешь Lombok

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String address;
    private String email;

}