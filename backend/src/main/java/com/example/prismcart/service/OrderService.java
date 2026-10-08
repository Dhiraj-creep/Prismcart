package com.example.prismcart.service;

import com.example.prismcart.dto.CouponDTO;
import com.example.prismcart.dto.OrderRequestDTO;
import com.example.prismcart.dto.OrderResponseDTO;
import com.example.prismcart.entity.Order;
import com.example.prismcart.entity.OrderItem;
import com.example.prismcart.entity.Product;
import com.example.prismcart.repository.OrderRepository;
import com.example.prismcart.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    private static final long FREE_SHIPPING_THRESHOLD_PAISE = 99900L; // ₹999
    private static final long STANDARD_SHIPPING_FEE_PAISE = 7900L;    // ₹79
    private static final SecureRandom RANDOM = new SecureRandom();

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CouponService couponService;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, CouponService couponService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.couponService = couponService;
    }

    public OrderResponseDTO createOrder(OrderRequestDTO request) {
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setFullName(request.getFullName().trim());
        order.setEmail(request.getEmail().trim());
        order.setPhone(request.getPhone().trim());
        order.setAddress(request.getAddress().trim());
        order.setCity(request.getCity().trim());
        order.setState(request.getState().trim());
        order.setPincode(request.getPincode().trim());
        order.setStatus("CONFIRMED");
        order.setCreatedAt(LocalDateTime.now());

        long subtotalPaise = 0L;

        // Process line items
        for (OrderRequestDTO.OrderItemRequestDTO itemReq : request.getItems()) {
            Optional<Product> prodOpt = productRepository.findBySlug(itemReq.getProductSlug());
            if (prodOpt.isEmpty()) {
                throw new IllegalArgumentException("Product with slug '" + itemReq.getProductSlug() + "' not found");
            }

            Product product = prodOpt.get();
            int qty = Math.max(1, itemReq.getQuantity() != null ? itemReq.getQuantity() : 1);

            // Deduct stock if available
            if (product.getStockQuantity() < qty) {
                throw new IllegalStateException("Insufficient stock for product " + product.getName() + ". Only " + product.getStockQuantity() + " available.");
            }
            product.setStockQuantity(product.getStockQuantity() - qty);
            productRepository.save(product);

            long unitPrice = product.getPrice();
            long lineTotal = unitPrice * qty;
            subtotalPaise += lineTotal;

            OrderItem orderItem = new OrderItem(
                    product.getSlug(),
                    product.getName(),
                    qty,
                    unitPrice,
                    lineTotal,
                    product.getImageUrl()
            );
            order.addItem(orderItem);
        }

        order.setSubtotal(subtotalPaise);

        // Apply discount if coupon provided
        long discountPaise = 0L;
        if (request.getCouponCode() != null && !request.getCouponCode().isBlank()) {
            CouponDTO couponRes = couponService.validateCoupon(request.getCouponCode(), subtotalPaise);
            if (couponRes.getValid()) {
                long calculated = Math.round((subtotalPaise * couponRes.getDiscountPercentage()) / 100.0);
                discountPaise = Math.min(calculated, couponRes.getMaxDiscount());
                order.setAppliedCoupon(couponRes.getCode());
            }
        }
        order.setDiscount(discountPaise);

        // Calculate shipping
        long shippingPaise = (subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE) ? 0L : STANDARD_SHIPPING_FEE_PAISE;
        order.setShipping(shippingPaise);

        // Total
        long totalPaise = Math.max(0L, subtotalPaise - discountPaise + shippingPaise);
        order.setTotal(totalPaise);

        Order savedOrder = orderRepository.save(order);
        return toResponseDTO(savedOrder);
    }

    @Transactional(readOnly = true)
    public Optional<OrderResponseDTO> getOrderByOrderNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber).map(this::toResponseDTO);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private String generateOrderNumber() {
        int rand1 = 100000 + RANDOM.nextInt(900000);
        int rand2 = 1000 + RANDOM.nextInt(9000);
        return "PRISM-" + rand1 + "-" + rand2;
    }

    private OrderResponseDTO toResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setFullName(order.getFullName());
        dto.setEmail(order.getEmail());
        dto.setPhone(order.getPhone());
        dto.setAddress(order.getAddress());
        dto.setCity(order.getCity());
        dto.setState(order.getState());
        dto.setPincode(order.getPincode());
        dto.setSubtotal(order.getSubtotal());
        dto.setDiscount(order.getDiscount());
        dto.setShipping(order.getShipping());
        dto.setTotal(order.getTotal());
        dto.setAppliedCoupon(order.getAppliedCoupon());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());

        if (order.getItems() != null) {
            dto.setItems(order.getItems().stream()
                    .map(i -> new OrderResponseDTO.OrderItemResponseDTO(
                            i.getProductSlug(),
                            i.getProductName(),
                            i.getQuantity(),
                            i.getPricePerUnit(),
                            i.getLineTotal(),
                            i.getImageUrl()
                    ))
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}
