package com.sunbeaminfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.fileupload.FileItem;



import com.sunbeaminfo.DTO.FileResponseDTO;
import com.sunbeaminfo.entities.Products;
import com.sunbeaminfo.service.FileService;
import com.sunbeaminfo.service.ProductsService;

import java.util.List;
import java.util.Optional;



import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Base64;
import java.util.Iterator;










@RestController
@CrossOrigin("*")
@RequestMapping("/admin/products")
public class ProductsController {

    private final ProductsService productsService;

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Products>> getAllProducts() {
        List<Products> products = productsService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable Long id) {
        Optional<Products> product = productsService.getProductById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // @PostMapping
    // public ResponseEntity<Products> createProduct(@RequestBody Products product) {
    //     Products createdProduct = productsService.createProduct(product);
    //     return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    // }

    @PostMapping
    public ResponseEntity<Products> createProduct(@RequestPart("data") Products product,
    @RequestPart("image") MultipartFile image) {

        String fileName =null;
        try {
            fileName = this.fileService.uploadImage(path,image);
        } catch (Exception e) {
            e.printStackTrace();
        }
        product.setProductImage(fileName);        
        Products createdProduct = productsService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

//     @PostMapping
// public ResponseEntity<Products> createProduct(
//     @RequestPart("image") MultipartFile image, // Expect the image part first
//     @RequestPart("data") Products product     // Then expect the data part
// ) {
//     String fileName = null;
//     try {
//         fileName = this.fileService.uploadImage(path, image);
//     } catch (Exception e) {
//         e.printStackTrace();
//     }
//     product.setProductImage(fileName);
//     Products createdProduct = productsService.createProduct(product);
//     return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
// }

// @PostMapping
// public ResponseEntity<Products> createProduct(HttpServletRequest request) {
//     try {
//         MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

//         // Extract the "image" part
//         MultipartFile imagePart = multipartRequest.getFile("image");
//         if (imagePart == null) {
//             return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
//         }
//         byte[] imageBytes = imagePart.getBytes();

//         MultipartFile image =  convertToMultipartFile(imageBytes,"filename.jpeg");


//         // Convert the image bytes to Base64
//         String imageBase64 = Base64.getEncoder().encodeToString(imageBytes);

//         // Extract the "data" part
//         String dataPart = multipartRequest.getParameter("data");
//         if (dataPart == null) {
//             return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
//         }

//         // Parse the JSON data using ObjectMapper
//         JsonNode dataNode = objectMapper.readTree(dataPart);
//         String productName = dataNode.get("productName").asText();
//         double productPrice = dataNode.get("productPrice").asDouble();
//         // Extract other fields similarly

//         // Process the image and data
//         String fileName = this.fileService.uploadImage(path, image);
//         Products product = new Products();
//         product.setProductName(productName);
//         product.setPrice(productPrice);
//         product.setProductImage(fileName);
//         // Set other fields

//         Products createdProduct = productsService.createProduct(product);
//         return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
//     } catch (IOException e) {
//         e.printStackTrace();
//         return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }

// public ResponseEntity<Products> createProduct(
//     @RequestParam("image") MultipartFile image,
//     @RequestParam("data") String dataPart) {
//     try {
//         // Convert the image bytes to Base64 if needed
//         String imageBase64 = Base64.getEncoder().encodeToString(image.getBytes());

//         // Parse the JSON data using ObjectMapper
//         JsonNode dataNode = objectMapper.readTree(dataPart);
//         String productName = dataNode.get("productName").asText();
//         double productPrice = dataNode.get("productPrice").asDouble();
//         // Extract other fields similarly

//         // Process the image and data
//         String fileName = this.fileService.uploadImage(path, image);
//         Products product = new Products();
//         product.setProductName(productName);
//         product.setPrice(productPrice);
//         product.setProductImage(fileName);
//         // Set other fields

//         Products createdProduct = productsService.createProduct(product);
//         return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
//     } catch (IOException e) {
//         e.printStackTrace();
//         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// }

// public MultipartFile convertToMultipartFile(byte[] bytes, String filename) {
//     FileItem fileItem = new DiskFileItem("image", "image/jpeg", false, filename, bytes.length, null);
//     try {
//         fileItem.getOutputStream().write(bytes);
//     } catch (Exception e) {
//         e.printStackTrace();
//     }
//     return new CommonsMultipartFile(fileItem);
// }


    


    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProduct(@PathVariable Long id, @RequestBody Products updatedProduct) {
        Products product = productsService.updateProduct(id, updatedProduct);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productsService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Products>> getProductsByCategory(@PathVariable String category) {
        List<Products> products = productsService.getProductsByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<String>> searchByName(@RequestParam ("name")String p){
        List<String> list =  productsService.searchProductsByName(p);
       return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}
