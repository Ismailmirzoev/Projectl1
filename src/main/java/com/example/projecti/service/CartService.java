package com.example.projecti.service;

import com.example.projecti.dto.CartItemDto;
import com.example.projecti.entity.CartItem;
import com.example.projecti.entity.Product;
import com.example.projecti.entity.User;
import com.example.projecti.repository.CartRepository; // Тебе нужен репозиторий для CartItem
import com.example.projecti.repository.ProductRepository;
import com.example.projecti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.projecti.dto.CartItemDto;
import java.util.List;
import java.util.stream.Collectors;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public void addItem(String email, Long productId, int quantity) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        CartItem item = new CartItem();
        item.setUser(user);
        item.setProduct(product);
        item.setQuantity(quantity);

        cartRepository.save(item);
    }

    public List<CartItemDto> getCartItems(String username) {
        return cartRepository.findAll().stream()
                .map(item -> new CartItemDto(item.getProduct(), item.getQuantity()))
                .collect(Collectors.toList());
    }
    public List<CartItemDto> getAllCartItemsForTest() {
        return cartRepository.findAll().stream()
                .map(item -> new CartItemDto(item.getProduct(), item.getQuantity()))
                .collect(Collectors.toList());
    }
}