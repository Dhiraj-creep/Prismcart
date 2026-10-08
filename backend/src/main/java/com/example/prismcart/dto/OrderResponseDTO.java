package com.example.prismcart.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {

    private Long id;
    private String orderNumber;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Long subtotal; // in paise
    private Long discount; // in paise
    private Long shipping; // in paise
    private Long total; // in paise
    private String appliedCoupon;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDTO> items;

    public static class OrderItemResponseDTO {
        private String productSlug;
        private String productName;
        private Integer quantity;
        private Long pricePerUnit; // in paise
        private Long lineTotal; // in paise
        private String imageUrl;

        public OrderItemResponseDTO() {}

        public OrderItemResponseDTO(String productSlug, String productName, Integer quantity, Long pricePerUnit, Long lineTotal, String imageUrl) {
            this.productSlug = productSlug;
            this.productName = productName;
            this.quantity = quantity;
            this.pricePerUnit = pricePerUnit;
            this.lineTotal = lineTotal;
            this.imageUrl = imageUrl;
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

    public OrderResponseDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Long getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Long subtotal) {
        this.subtotal = subtotal;
    }

    public Long getDiscount() {
        return discount;
    }

    public void setDiscount(Long discount) {
        this.discount = discount;
    }

    public Long getShipping() {
        return shipping;
    }

    public void setShipping(Long shipping) {
        this.shipping = shipping;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public String getAppliedCoupon() {
        return appliedCoupon;
    }

    public void setAppliedCoupon(String appliedCoupon) {
        this.appliedCoupon = appliedCoupon;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDTO> items) {
        this.items = items;
    }
}
