package com.example.prismcart.service;

import com.example.prismcart.dto.CategoryDTO;
import com.example.prismcart.entity.Category;
import com.example.prismcart.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<CategoryDTO> getCategoryById(Long id) {
        return categoryRepository.findById(id).map(this::toDTO);
    }

    public Optional<CategoryDTO> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug).map(this::toDTO);
    }

    @Transactional
    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = new Category();
        category.setSlug(dto.getSlug() != null ? dto.getSlug() : dto.getName().toLowerCase().replace(" ", "-"));
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setAccentColor(dto.getAccentColor());
        category.setIconName(dto.getIconName());
        Category saved = categoryRepository.save(category);
        return toDTO(saved);
    }

    @Transactional
    public Optional<CategoryDTO> updateCategory(Long id, CategoryDTO dto) {
        return categoryRepository.findById(id).map(category -> {
            if (dto.getName() != null) category.setName(dto.getName());
            if (dto.getDescription() != null) category.setDescription(dto.getDescription());
            if (dto.getAccentColor() != null) category.setAccentColor(dto.getAccentColor());
            if (dto.getIconName() != null) category.setIconName(dto.getIconName());
            return toDTO(categoryRepository.save(category));
        });
    }

    @Transactional
    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public CategoryDTO toDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getSlug(),
                category.getName(),
                category.getDescription(),
                category.getAccentColor(),
                category.getIconName(),
                category.getProducts() != null ? category.getProducts().size() : 0
        );
    }
}
