package com.example.prismcart.controller;

import com.example.prismcart.dto.CategoryDTO;
import com.example.prismcart.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{idOrSlug}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable String idOrSlug) {
        try {
            Long id = Long.parseLong(idOrSlug);
            return categoryService.getCategoryById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> categoryService.getCategoryBySlug(idOrSlug)
                            .map(ResponseEntity::ok)
                            .orElse(ResponseEntity.notFound().build()));
        } catch (NumberFormatException e) {
            return categoryService.getCategoryBySlug(idOrSlug)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        return categoryService.updateCategory(id, categoryDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryService.deleteCategory(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}