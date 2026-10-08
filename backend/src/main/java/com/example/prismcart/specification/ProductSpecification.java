package com.example.prismcart.specification;

import com.example.prismcart.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filter(
            String categorySlug,
            String brand,
            String search,
            Long minPrice,
            Long maxPrice,
            Double minRating,
            Boolean inStockOnly,
            String badge) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Category Filter
            if (categorySlug != null && !categorySlug.isBlank() && !categorySlug.equalsIgnoreCase("all")) {
                predicates.add(cb.or(
                        cb.equal(cb.lower(root.get("category").get("slug")), categorySlug.toLowerCase()),
                        cb.equal(cb.lower(root.get("category").get("name")), categorySlug.toLowerCase())
                ));
            }

            // 2. Brand Filter
            if (brand != null && !brand.isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("brand")), brand.toLowerCase()));
            }

            // 3. Search Filter across multiple fields (name, brand, shortDescription)
            if (search != null && !search.isBlank()) {
                String searchPattern = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), searchPattern),
                        cb.like(cb.lower(root.get("brand")), searchPattern),
                        cb.like(cb.lower(root.get("shortDescription")), searchPattern)
                ));
            }

            // 4. Min Price
            if (minPrice != null && minPrice > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            // 5. Max Price
            if (maxPrice != null && maxPrice > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            // 6. Min Rating
            if (minRating != null && minRating > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("rating"), minRating));
            }

            // 7. In Stock Only
            if (inStockOnly != null && inStockOnly) {
                predicates.add(cb.greaterThan(root.get("stockQuantity"), 0));
            }

            // 8. Badge Filter (e.g. Featured, Bestseller, New)
            if (badge != null && !badge.isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("badge")), badge.toLowerCase()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
