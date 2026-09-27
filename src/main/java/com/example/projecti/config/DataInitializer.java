package com.example.projecti.config;

import com.example.projecti.entity.Category;
import com.example.projecti.entity.Product;
import com.example.projecti.entity.User;
import com.example.projecti.repository.CategoryRepository;
import com.example.projecti.repository.ProductRepository;
import com.example.projecti.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public DataInitializer(CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (categoryRepository.count() == 0) {
            categoryRepository.save(Category.builder().name("Электроника").imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e").build());
            categoryRepository.save(Category.builder().name("Одежда и обувь").imageUrl("https://images.unsplash.com/photo-1483985988355-763728e1935b").build());
            System.out.println(">> Категории успешно созданы!");
        }

        List<Category> categories = categoryRepository.findAll();
        Category electronics = categories.get(0);
        Category clothes = categories.get(1);

        User seller;
        if (userRepository.count() == 0) {
            if (userRepository.count() == 0) {
                seller = new User();
                seller.setUsername("admin"); // <-- ОБЯЗАТЕЛЬНО ДОБАВЬ ЭТУ СТРОКУ!
                seller.setEmail("admin@example.com");
                seller.setPassword("password");
                seller.setFirstName("Admin");
                seller.setLastName("Adminov");
                userRepository.save(seller);
                System.out.println(">> Продавец успешно создан!");
            } else {
                seller = userRepository.findAll().get(0);
            }
        } else {
            seller = userRepository.findAll().get(0);
        }

        if (productRepository.count() == 0) {
            Product phone = new Product();
            phone.setName("Смартфон Quantum X");
            phone.setDescription("Мощный смартфон с крутой камерой.");
            phone.setPrice(new BigDecimal("799.99"));
            phone.setImageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500");
            phone.setStockQuantity(15);
            phone.setCategory(electronics);
            phone.setSeller(seller);
            productRepository.save(phone);

            Product headphones = new Product();
            headphones.setName("Беспроводные наушники SoundPro");
            headphones.setDescription("Чистый звук и глубокие басы.");
            headphones.setPrice(new BigDecimal("149.50"));
            headphones.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500");
            headphones.setStockQuantity(42);
            headphones.setCategory(electronics);
            headphones.setSeller(seller);
            productRepository.save(headphones);

            Product jacket = new Product();
            jacket.setName("Куртка зимняя Urban");
            jacket.setDescription("Теплая куртка для городских условий.");
            jacket.setPrice(new BigDecimal("120.00"));
            jacket.setImageUrl("https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500");
            jacket.setStockQuantity(8);
            jacket.setCategory(clothes);
            jacket.setSeller(seller);
            productRepository.save(jacket);

            System.out.println(">> Все тестовые товары успешно добавлены!");
        }
    }
}