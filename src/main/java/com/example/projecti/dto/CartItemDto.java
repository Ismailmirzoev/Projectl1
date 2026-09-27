package com.example.projecti.dto;

import com.example.projecti.entity.Product;

public class CartItemDto {
    private Product product;
    private int quantity;

    public CartItemDto(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}