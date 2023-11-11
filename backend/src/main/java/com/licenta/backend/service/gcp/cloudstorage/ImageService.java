package com.licenta.backend.service.gcp.cloudstorage;

import com.google.cloud.storage.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {

    private static Storage storage = StorageOptions.getDefaultInstance().getService();

    @Value("${gcp.bucket.name}")
    private String bucketName;

    public String saveImage(MultipartFile file) throws IOException {
        String fileName = System.nanoTime() + file.getOriginalFilename();

        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder(bucketName, fileName)
                        .setContentType(file.getContentType())
                        .setAcl(
                                List.of(
                                        Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER)
                                ))
                        .build(),
                file.getInputStream()
        );

        return "https://storage.googleapis.com/" + bucketName + "/" + fileName;
    }

}
