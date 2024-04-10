package com.licenta.backend.service;

import com.licenta.backend.entity.Sizes;
import com.licenta.backend.repository.SizesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SizesService {

    private final SizesRepository sizesRepository;

    public void deleteByProductId(Long id) {
        sizesRepository.deleteByProductId(id);
    }


    public List<Sizes> findAll() {
        return sizesRepository.findAll();
    }

    public List<Sizes> findSizesByProductId(Long id) {
        List<Sizes> sizes = sizesRepository.findAll();

        List<Sizes> sizesByProductId = sizes.stream()
                .filter(size -> size.getProduct().getId() == id)
                .collect(Collectors.toList());

        return sizesByProductId;
    }

}
