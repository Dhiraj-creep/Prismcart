package com.example.prismcart.dto;

import java.util.List;
import java.util.Map;

public class ProductDTO {

    private Long id;
    private String slug;
    private String name;
    private String brand;
    private CategoryDTO category;
    private Long price; // in paise
    private Long originalPrice; // in paise
    private Double rating;
    private Integer reviewCount;
    private String shortDescription;
    private String detailedDescription;
    private Map<String, String> specifications;
    private Integer stockQuantity;
    private String imageUrl;
    private String imageAltText;
    private List<String> tags;
    private String badge;

    public ProductDTO() {}

    public ProductDTO(Long id, String slug, String name, String brand, CategoryDTO category,
                      Long price, Long originalPrice, Double rating, Integer reviewCount,
                      String shortDescription, String detailedDescription, Map<String, String> specifications,
                      Integer stockQuantity, String imageUrl, String imageAltText, List<String> tags,
                      String badge) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.price = price;
        this.originalPrice = originalPrice;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.shortDescription = shortDescription;
        this.detailedDescription = detailedDescription;
        this.specifications = specifications;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.imageAltText = imageAltText;
        this.tags = tags;
        this.badge = badge;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Long originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getDetailedDescription() {
        return detailedDescription;
    }

    public void setDetailedDescription(String detailedDescription) {
        this.detailedDescription = detailedDescription;
    }

    public Map<String, String> getSpecifications() {
        return specifications;
    }

    public void setSpecifications(Map<String, String> specifications) {
        this.specifications = specifications;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageAltText() {
        return imageAltText;
    }

    public void setImageAltText(String imageAltText) {
        this.imageAltText = imageAltText;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }
}