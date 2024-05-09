package com.licenta.backend.service;

import com.licenta.backend.entity.Product;
import com.licenta.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> findPresentationProducts() {

        Sort sort = Sort.by(Sort.Direction.ASC, "registrationDate").and(Sort.by(Sort.Direction.DESC, "id"));
        Pageable pageable = PageRequest.of(0, 8, sort);

        return productRepository.findAll(pageable).getContent();

    }
    public List<Product> findRecommendedProducts() {

        List<Product> products = productRepository.findAll();
        Collections.shuffle(products);
        return products.subList(0, Math.min(8, products.size()));
    }

}
