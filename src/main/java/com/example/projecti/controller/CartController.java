package com.example.projecti.controller;

import com.example.projecti.entity.CartItem;
import com.example.projecti.repository.CartRepository;
import com.example.projecti.repository.ProductRepository;
import com.example.projecti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.projecti.service.CartService;
import java.util.List;

import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/api/cart/update/{itemId}")
    public ResponseEntity<?> updateQuantity(@PathVariable Long itemId, @RequestParam int quantity) {
        System.out.println("Обновляем товар ID: " + itemId + " на количество: " + quantity);

        CartItem item = cartRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Товар с ID " + itemId + " не найден в корзине"));

        item.setQuantity(quantity);
        cartRepository.save(item);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getCart() {
        return ResponseEntity.ok(cartService.getAllCartItemsForTest());
    }
    @GetMapping("/api/cart/items")
    public List<CartItem> getCartItems(Principal principal) {
        if (principal == null) {
            throw new RuntimeException("Пользователь не авторизован");
        }

        com.example.projecti.entity.User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        return cartRepository .findByUserId(user.getId());
    }
    @PostMapping("/add") // Путь будет /api/cart/add
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Не авторизован");
        }

        var user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        var product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Товар не найден"));
        CartItem newItem = new CartItem();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(request.getQuantity());

        cartRepository.save(newItem);

        return ResponseEntity.ok("Товар добавлен в корзину!");
    }
    public static class CartRequest {
        private Long productId;
        private int quantity;

        // Геттеры и сеттеры
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
    @DeleteMapping("/api/cart/remove/{itemId}") // Убедись, что это совпадает
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId) {
        cartRepository.deleteById(itemId);
        return ResponseEntity.ok().build();
    }

}