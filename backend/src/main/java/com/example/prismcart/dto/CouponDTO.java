package com.example.prismcart.dto;

public class CouponDTO {

    private String code;
    private Integer discountPercentage;
    private Long maxDiscount; // in paise
    private Long minOrderAmount; // in paise
    private String description;
    private Boolean valid;
    private String message;

    public CouponDTO() {}

    public CouponDTO(String code, Integer discountPercentage, Long maxDiscount, Long minOrderAmount, String description, Boolean valid, String message) {
        this.code = code;
        this.discountPercentage = discountPercentage;
        this.maxDiscount = maxDiscount;
        this.minOrderAmount = minOrderAmount;
        this.description = description;
        this.valid = valid;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Integer discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Long getMaxDiscount() {
        return maxDiscount;
    }

    public void setMaxDiscount(Long maxDiscount) {
        this.maxDiscount = maxDiscount;
    }

    public Long getMinOrderAmount() {
        return minOrderAmount;
    }

    public void setMinOrderAmount(Long minOrderAmount) {
        this.minOrderAmount = minOrderAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
