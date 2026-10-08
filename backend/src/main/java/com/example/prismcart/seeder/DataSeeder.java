package com.example.prismcart.seeder;

import com.example.prismcart.entity.Category;
import com.example.prismcart.entity.Coupon;
import com.example.prismcart.entity.Product;
import com.example.prismcart.repository.CategoryRepository;
import com.example.prismcart.repository.CouponRepository;
import com.example.prismcart.repository.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(CategoryRepository categoryRepository,
                      ProductRepository productRepository,
                      CouponRepository couponRepository,
                      ObjectMapper objectMapper) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        seedCoupons();

        if (categoryRepository.count() == 0) {
            log.info("Database empty. Seeding PrismCart categories and 60 products from catalog data...");
            seedCategoriesAndProducts();
        } else {
            log.info("Database already contains {} categories and {} products. Skipping seeding.",
                    categoryRepository.count(), productRepository.count());
        }
    }

    private void seedCoupons() {
        if (couponRepository.count() == 0) {
            Coupon welcome = new Coupon(
                    "WELCOME10",
                    10,
                    50000L, // ₹500 in paise
                    0L,
                    "10% off demo coupon capped at ₹500"
            );
            Coupon super20 = new Coupon(
                    "SUPER20",
                    20,
                    100000L, // ₹1,000 in paise
                    150000L, // Min order ₹1,500
                    "20% off on orders above ₹1,500 capped at ₹1,000"
            );
            couponRepository.saveAll(List.of(welcome, super20));
            log.info("Seeded demo coupons: WELCOME10, SUPER20");
        }
    }

    private void seedCategoriesAndProducts() {
        try {
            // 1. Seed Categories
            ClassPathResource catResource = new ClassPathResource("data/categories.json");
            Map<String, Category> categoryMap = new HashMap<>();

            if (catResource.exists()) {
                try (InputStream is = catResource.getInputStream()) {
                    List<JsonNode> catNodes = objectMapper.readValue(is, new TypeReference<>() {});
                    for (JsonNode node : catNodes) {
                        String slug = node.path("slug").asText(node.path("id").asText());
                        String name = node.path("name").asText();
                        String description = node.path("description").asText();
                        String accentColor = node.path("accentColor").asText("#2563EB");
                        String iconName = node.path("iconName").asText();

                        Category category = new Category(slug, name, description, accentColor, iconName);
                        Category saved = categoryRepository.save(category);
                        categoryMap.put(slug, saved);
                    }
                    log.info("Seeded {} categories.", categoryMap.size());
                }
            }

            // 2. Seed Products
            ClassPathResource prodResource = new ClassPathResource("data/products.json");
            if (prodResource.exists()) {
                try (InputStream is = prodResource.getInputStream()) {
                    List<JsonNode> prodNodes = objectMapper.readValue(is, new TypeReference<>() {});
                    for (JsonNode node : prodNodes) {
                        Product product = new Product();
                        product.setSlug(node.path("slug").asText());
                        product.setName(node.path("name").asText());
                        product.setBrand(node.path("brand").asText());

                        String catSlug = node.path("categorySlug").asText();
                        Category cat = categoryMap.get(catSlug);
                        if (cat != null) {
                            product.setCategory(cat);
                        }

                        product.setPrice(node.path("price").asLong());
                        if (node.hasNonNull("originalPrice")) {
                            product.setOriginalPrice(node.path("originalPrice").asLong());
                        }

                        product.setRating(node.path("rating").asDouble(4.5));
                        product.setReviewCount(node.path("reviewCount").asInt(100));
                        product.setShortDescription(node.path("shortDescription").asText());
                        product.setDetailedDescription(node.path("detailedDescription").asText());
                        product.setStockQuantity(node.path("stockQuantity").asInt(15));
                        product.setImageUrl(node.path("imageUrl").asText());
                        product.setImageAltText(node.path("imageAltText").asText());

                        if (node.hasNonNull("badge")) {
                            product.setBadge(node.path("badge").asText());
                        }

                        // Tags
                        if (node.has("tags") && node.get("tags").isArray()) {
                            for (JsonNode t : node.get("tags")) {
                                product.getTags().add(t.asText());
                            }
                        }

                        // Specifications Map
                        if (node.has("specifications") && node.get("specifications").isObject()) {
                            node.get("specifications").fields().forEachRemaining(entry -> {
                                product.getSpecifications().put(entry.getKey(), entry.getValue().asText());
                            });
                        }

                        productRepository.save(product);
                    }
                    log.info("Seeded {} products into database.", productRepository.count());
                }
            }
        } catch (Exception e) {
            log.error("Failed to seed database from catalog data", e);
        }
    }
}
