package com.licenta.backend.service;

import com.licenta.backend.entity.Product;
import com.licenta.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public String extractBase64Code(String input) {
        String base64Code = "";
        int start = 0;
        while (start >= 0) {
            start = input.indexOf('"', start + 1);
            if (start < 0) {
                break;
            }
            int end = input.indexOf('"', start + 1);
            if (end < 0) {
                break;
            }
            base64Code = input.substring(start + 1, end);
        }
        return base64Code;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
