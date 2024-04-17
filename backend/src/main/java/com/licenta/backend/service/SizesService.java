package com.licenta.backend.service;

import com.licenta.backend.entity.Size;
import com.licenta.backend.repository.SizesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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


    public List<Size> findAll() {
        return sizesRepository.findAll();
    }

    public List<Size> findSizesByProductId(Long id) {
        List<Size> sizes = sizesRepository.findAll();

        List<Size> sizeByProductId = sizes.stream()
                .filter(size -> size.getProduct().getId() == id)
                .collect(Collectors.toList());

        return sizeByProductId;
    }

}
