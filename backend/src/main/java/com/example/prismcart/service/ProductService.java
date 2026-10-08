package com.example.prismcart.service;

import com.example.prismcart.dto.CategoryDTO;
import com.example.prismcart.dto.ProductDTO;
import com.example.prismcart.entity.Category;
import com.example.prismcart.entity.Product;
import com.example.prismcart.repository.CategoryRepository;
import com.example.prismcart.repository.ProductRepository;
import com.example.prismcart.specification.ProductSpecification;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductDTO> getProducts(
            String category,
            String brand,
            String search,
            Long minPrice,
            Long maxPrice,
            Double minRating,
            Boolean inStockOnly,
            String badge,
            String sortBy) {

        Specification<Product> spec = ProductSpecification.filter(
                category, brand, search, minPrice, maxPrice, minRating, inStockOnly, badge
        );

        Sort sort;
        if ("price-asc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.ASC, "price");
        } else if ("price-desc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "price");
        } else if ("rating-desc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "rating").and(Sort.by(Sort.Direction.DESC, "reviewCount"));
        } else if ("name-asc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.ASC, "name");
        } else {
            // Default "featured" or natural id order
            sort = Sort.by(Sort.Direction.ASC, "id");
        }

        return productRepository.findAll(spec, sort).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductDTO> getProductBySlug(String slug) {
        return productRepository.findBySlug(slug).map(this::toDTO);
    }

    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id).map(this::toDTO);
    }

    public List<ProductDTO> getProductsByBadge(String badge) {
        return productRepository.findByBadge(badge).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = new Product();
        product.setSlug(dto.getSlug());
        product.setName(dto.getName());
        product.setBrand(dto.getBrand());

        if (dto.getCategory() != null) {
            Optional<Category> cat = dto.getCategory().getSlug() != null
                    ? categoryRepository.findBySlug(dto.getCategory().getSlug())
                    : categoryRepository.findById(dto.getCategory().getId());
            cat.ifPresent(product::setCategory);
        }

        product.setPrice(dto.getPrice());
        product.setOriginalPrice(dto.getOriginalPrice());
        product.setRating(dto.getRating() != null ? dto.getRating() : 0.0);
        product.setReviewCount(dto.getReviewCount() != null ? dto.getReviewCount() : 0);
        product.setShortDescription(dto.getShortDescription());
        product.setDetailedDescription(dto.getDetailedDescription());
        product.setSpecifications(dto.getSpecifications());
        product.setStockQuantity(dto.getStockQuantity());
        product.setImageUrl(dto.getImageUrl());
        product.setImageAltText(dto.getImageAltText());
        product.setTags(dto.getTags());
        product.setBadge(dto.getBadge());

        Product saved = productRepository.save(product);
        return toDTO(saved);
    }

    @Transactional
    public Optional<ProductDTO> updateProduct(String slug, ProductDTO dto) {
        return productRepository.findBySlug(slug).map(product -> {
            if (dto.getName() != null) product.setName(dto.getName());
            if (dto.getBrand() != null) product.setBrand(dto.getBrand());
            if (dto.getPrice() != null) product.setPrice(dto.getPrice());
            if (dto.getOriginalPrice() != null) product.setOriginalPrice(dto.getOriginalPrice());
            if (dto.getRating() != null) product.setRating(dto.getRating());
            if (dto.getReviewCount() != null) product.setReviewCount(dto.getReviewCount());
            if (dto.getShortDescription() != null) product.setShortDescription(dto.getShortDescription());
            if (dto.getDetailedDescription() != null) product.setDetailedDescription(dto.getDetailedDescription());
            if (dto.getSpecifications() != null) product.setSpecifications(dto.getSpecifications());
            if (dto.getStockQuantity() != null) product.setStockQuantity(dto.getStockQuantity());
            if (dto.getImageUrl() != null) product.setImageUrl(dto.getImageUrl());
            if (dto.getImageAltText() != null) product.setImageAltText(dto.getImageAltText());
            if (dto.getTags() != null) product.setTags(dto.getTags());
            if (dto.getBadge() != null) product.setBadge(dto.getBadge());
            return toDTO(productRepository.save(product));
        });
    }

    @Transactional
    public boolean deleteProduct(String slug) {
        return productRepository.findBySlug(slug).map(product -> {
            productRepository.delete(product);
            return true;
        }).orElse(false);
    }

    public ProductDTO toDTO(Product p) {
        CategoryDTO catDTO = null;
        if (p.getCategory() != null) {
            catDTO = new CategoryDTO(
                    p.getCategory().getId(),
                    p.getCategory().getSlug(),
                    p.getCategory().getName(),
                    p.getCategory().getDescription(),
                    p.getCategory().getAccentColor(),
                    p.getCategory().getIconName(),
                    null
            );
        }

        return new ProductDTO(
                p.getId(),
                p.getSlug(),
                p.getName(),
                p.getBrand(),
                catDTO,
                p.getPrice(),
                p.getOriginalPrice(),
                p.getRating(),
                p.getReviewCount(),
                p.getShortDescription(),
                p.getDetailedDescription(),
                p.getSpecifications(),
                p.getStockQuantity(),
                p.getImageUrl(),
                p.getImageAltText(),
                p.getTags(),
                p.getBadge()
        );
    }
}
