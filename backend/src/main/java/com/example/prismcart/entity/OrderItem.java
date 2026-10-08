package com.example.prismcart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(nullable = false)
    private String productSlug;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Long pricePerUnit; // in paise

    @Column(nullable = false)
    private Long lineTotal; // in paise

    private String imageUrl;

    public OrderItem() {
    }

    public OrderItem(String productSlug, String productName, Integer quantity, Long pricePerUnit, Long lineTotal, String imageUrl) {
        this.productSlug = productSlug;
        this.productName = productName;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.lineTotal = lineTotal;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getProductSlug() {
        return productSlug;
    }

    public void setProductSlug(String productSlug) {
        this.productSlug = productSlug;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(Long pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public Long getLineTotal() {
        return lineTotal;
    }

    public void setLineTotal(Long lineTotal) {
        this.lineTotal = lineTotal;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
