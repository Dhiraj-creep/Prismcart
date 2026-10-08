package com.example.prismcart.dto;

public class CategoryDTO {

    private Long id;
    private String slug;
    private String name;
    private String description;
    private String accentColor;
    private String iconName;
    private Integer productCount;

    public CategoryDTO() {}

    public CategoryDTO(Long id, String slug, String name, String description, String accentColor, String iconName, Integer productCount) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.accentColor = accentColor;
        this.iconName = iconName;
        this.productCount = productCount;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public Integer getProductCount() {
        return productCount;
    }

    public void setProductCount(Integer productCount) {
        this.productCount = productCount;
    }
}