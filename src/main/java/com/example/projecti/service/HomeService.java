package com.example.projecti.service;


import com.example.projecti.dto.CategoryDto;
import com.example.projecti.dto.ProductShortDto;
import com.example.projecti.entity.Category;
import com.example.projecti.entity.Product;
import com.example.projecti.repository.CategoryRepository;
import com.example.projecti.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToCategoryDto)
                .collect(Collectors.toList());
    }

    public List<ProductShortDto> getHomeProducts() {
        List<Product> products = productRepository.findTopProducts(PageRequest.of(0, 8));
        return products.stream()
                .map(this::mapToProductShortDto)
                .collect(Collectors.toList());
    }

    private CategoryDto mapToCategoryDto(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setImageUrl(category.getImageUrl());
        return dto;
    }

    private ProductShortDto mapToProductShortDto(Product product) {
        ProductShortDto dto = new ProductShortDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setCategoryName(product.getCategory().getName());
        return dto;
    }
}