package com.example.prismcart.service;

import com.example.prismcart.dto.CouponDTO;
import com.example.prismcart.entity.Coupon;
import com.example.prismcart.repository.CouponRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public CouponDTO validateCoupon(String code, Long orderSubtotalPaise) {
        if (code == null || code.trim().isEmpty()) {
            return new CouponDTO(code, 0, 0L, 0L, "No coupon provided", false, "Please enter a coupon code");
        }

        Optional<Coupon> opt = couponRepository.findByCodeIgnoreCaseAndActiveTrue(code.trim());
        if (opt.isEmpty()) {
            return new CouponDTO(code, 0, 0L, 0L, "Invalid coupon", false, "Coupon code is invalid or has expired");
        }

        Coupon coupon = opt.get();
        if (orderSubtotalPaise != null && orderSubtotalPaise < coupon.getMinOrderAmount()) {
            long minRupees = coupon.getMinOrderAmount() / 100;
            return new CouponDTO(coupon.getCode(), coupon.getDiscountPercentage(), coupon.getMaxDiscount(), coupon.getMinOrderAmount(),
                    coupon.getDescription(), false, "Minimum order of ₹" + minRupees + " required to use this coupon");
        }

        return new CouponDTO(
                coupon.getCode(),
                coupon.getDiscountPercentage(),
                coupon.getMaxDiscount(),
                coupon.getMinOrderAmount(),
                coupon.getDescription(),
                true,
                "Coupon " + coupon.getCode() + " applied successfully! (" + coupon.getDiscountPercentage() + "% discount)"
        );
    }
}
