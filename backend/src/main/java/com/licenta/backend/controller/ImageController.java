package com.licenta.backend.controller;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.licenta.backend.service.GoogleCloudStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {
    private Storage storage;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        GoogleCloudStorageService googleCloudStorageService = new GoogleCloudStorageService();
        String imageUrl = googleCloudStorageService.saveImage(file);
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }
}

