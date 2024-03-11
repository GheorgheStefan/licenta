package com.licenta.backend.service;

import com.licenta.backend.entity.OtherProductImages;
import com.licenta.backend.repository.OtherProductImagesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtherProductImagesService {
    private final OtherProductImagesRepository otherProductImagesRepository;

    public void deleteByProductId(Long id) {
        otherProductImagesRepository.deleteByProductId(id);
    }

    public List<OtherProductImages> findAll() {
        return otherProductImagesRepository.findAll();
    }
}
