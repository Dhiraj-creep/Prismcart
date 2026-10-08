package com.example.prismcart.controller;

import com.example.prismcart.dto.CouponDTO;
import com.example.prismcart.service.CouponService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "*")
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @GetMapping("/validate")
    public ResponseEntity<CouponDTO> validateCoupon(
            @RequestParam String code,
            @RequestParam(required = false) Long subtotalPaise) {
        return ResponseEntity.ok(couponService.validateCoupon(code, subtotalPaise));
    }
}
