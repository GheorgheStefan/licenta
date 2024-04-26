package com.licenta.backend.service.utils;

import com.google.cloud.storage.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        return "https://storage.googleapis.com/licenta-gheorghe-stefan/" + blobId.getName();
    }

    public String saveImage(byte[] bytes, String contentType) {
        BlobId blobId = BlobId.of(bucketName, UUID.randomUUID().toString());
        // TODO: set content type based on file type
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build();
        storage.create(blobInfo, bytes);
        return "https://storage.googleapis.com/licenta-gheorghe-stefan/" + blobId.getName();
    }

    public void deleteImage(String imageUrl) {
        String[] parts = imageUrl.split("/");
        String imageName = parts[parts.length - 1];
        storage.delete(bucketName, imageName);
    }

}