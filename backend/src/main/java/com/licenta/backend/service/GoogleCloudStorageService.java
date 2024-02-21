package com.licenta.backend.service;

import com.google.cloud.storage.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class GoogleCloudStorageService {

        private final Storage storage = StorageOptions.getDefaultInstance().getService();
        private final String bucketName = "licenta-gheorghe-stefan";

    public String saveImage(MultipartFile file) throws IOException {
        BlobId blobId = BlobId.of(bucketName, UUID.randomUUID().toString());
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
        storage.create(blobInfo, file.getBytes());
        System.out.println(blobInfo.getName());
        return "https://storage.googleapis.com/licenta-gheorghe-stefan/" + blobId.getName();
    }
}