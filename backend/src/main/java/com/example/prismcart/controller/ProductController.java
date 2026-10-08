package com.example.prismcart.controller;

import com.example.prismcart.dto.ProductDTO;
import com.example.prismcart.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Boolean inStockOnly,
            @RequestParam(required = false) String badge,
            @RequestParam(required = false, defaultValue = "featured") String sort) {

        List<ProductDTO> products = productService.getProducts(
                category, brand, search, minPrice, maxPrice, minRating, inStockOnly, badge, sort
        );
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProductDTO> getProductBySlug(@PathVariable String slug) {
        return productService.getProductBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/badge/{badge}")
    public ResponseEntity<List<ProductDTO>> getProductsByBadge(@PathVariable String badge) {
        return ResponseEntity.ok(productService.getProductsByBadge(badge));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.createProduct(productDTO));
    }

    @PutMapping("/{slug}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable String slug, @RequestBody ProductDTO productDTO) {
        return productService.updateProduct(slug, productDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String slug) {
        if (productService.deleteProduct(slug)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}