package com.example.prismcart.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.List;

public class OrderRequestDTO {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Valid 10-digit Indian mobile number is required")
    private String phone;

    @NotBlank(message = "Street address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "PIN code is required")
    @Pattern(regexp = "^\\d{6}$", message = "Valid 6-digit Indian PIN code is required")
    private String pincode;

    private String couponCode;

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItemRequestDTO> items;

    public static class OrderItemRequestDTO {
        @NotBlank
        private String productSlug;
        private Integer quantity;

        public OrderItemRequestDTO() {}

        public OrderItemRequestDTO(String productSlug, Integer quantity) {
            this.productSlug = productSlug;
            this.quantity = quantity;
        }

        public String getProductSlug() {
            return productSlug;
        }

        public void setProductSlug(String productSlug) {
            this.productSlug = productSlug;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }

    public OrderRequestDTO() {}

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

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public List<OrderItemRequestDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDTO> items) {
        this.items = items;
    }
}
