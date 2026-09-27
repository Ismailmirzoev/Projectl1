package com.example.projecti.repository;

import com.example.projecti.entity.CartItem;
import com.example.projecti.entity.Product;
import com.example.projecti.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    CartItem findByUserAndProduct(User user, Product product);

    List<CartItem> findByUser(User user);
    List<CartItem> findByUserId(Long userId);
}