package com.licenta.backend.controller;

import com.licenta.backend.service.gcp.cloudstorage.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gcp")
@RequiredArgsConstructor
public class GcpController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public String upload() {
        return "https://storage.googleapis.com/" + imageService.saveImage();
    }


}
