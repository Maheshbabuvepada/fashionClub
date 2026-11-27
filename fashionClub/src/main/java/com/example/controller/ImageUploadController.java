
package com.example.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Locale;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ImageUploadController {

    // Backend images folder
    private final Path uploadPath = Path.of(
        "C:/Users/MAHESH BABU/git/fashionClub1/fashionClub/src/main/resources/static/images"
    ).toAbsolutePath().normalize();

    // UPLOAD IMAGE
    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file) {

        try {

            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Please select an image");
            }

            String originalName = file.getOriginalFilename();

            if (originalName == null || originalName.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Invalid image filename");
            }

            // Get original filename
            originalName = originalName.replace("\\", "/");

            String fileName = originalName.substring(
                    originalName.lastIndexOf("/") + 1
            );

            if (fileName.isBlank() || fileName.startsWith(".")) {
                return ResponseEntity.badRequest()
                        .body("Invalid image filename");
            }

            // Allow only image extensions
            String extension = fileName.substring(
                    fileName.lastIndexOf(".") + 1
            ).toLowerCase(Locale.ROOT);

            if (!extension.matches("png|jpg|jpeg|webp|avif|gif")) {
                return ResponseEntity.badRequest()
                        .body("Only PNG, JPG, JPEG, WEBP, AVIF and GIF images are allowed");
            }

            // Validate image content type
            String contentType = file.getContentType();

            if (contentType == null ||
                    !contentType.toLowerCase(Locale.ROOT).startsWith("image/")) {

                return ResponseEntity.badRequest()
                        .body("Only image files are allowed");
            }

            // Create folder if not available
            Files.createDirectories(uploadPath);

            // Save with original filename
            Path destination = uploadPath.resolve(fileName).normalize();

            if (!destination.startsWith(uploadPath)) {
                return ResponseEntity.badRequest()
                        .body("Invalid filename");
            }

            // Do not overwrite existing images
            if (Files.exists(destination)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("This image filename already exists. Please rename the file and try again.");
            }

            Files.copy(file.getInputStream(), destination);

            System.out.println("IMAGE SAVED SUCCESSFULLY: " + destination);

            return ResponseEntity.ok(
                    Map.of("image", fileName)
            );

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Image upload failed");
        }
    }

    // DISPLAY IMAGE
    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String fileName) {

        try {

            Path imagePath = uploadPath.resolve(fileName).normalize();

            // Security check
            if (!imagePath.startsWith(uploadPath)) {
                return ResponseEntity.badRequest().build();
            }

            if (!Files.exists(imagePath) ||
                    !Files.isRegularFile(imagePath)) {

                return ResponseEntity.notFound().build();
            }

            String extension = fileName.substring(
                    fileName.lastIndexOf(".") + 1
            ).toLowerCase(Locale.ROOT);

            MediaType mediaType;

            switch (extension) {
                case "png":
                    mediaType = MediaType.IMAGE_PNG;
                    break;

                case "jpg":
                case "jpeg":
                    mediaType = MediaType.IMAGE_JPEG;
                    break;

                case "gif":
                    mediaType = MediaType.IMAGE_GIF;
                    break;

                case "webp":
                    mediaType = MediaType.parseMediaType("image/webp");
                    break;

                case "avif":
                    mediaType = MediaType.parseMediaType("image/avif");
                    break;

                default:
                    return ResponseEntity.badRequest().build();
            }

            Resource resource = new FileSystemResource(imagePath);

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}
