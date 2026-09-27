package com.example.projecti.dto; // или ваш пакет

public class CartRequest {
    private Long productId;
    private int quantity; // ОБЯЗАТЕЛЬНО добавьте это поле

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}