package com.licenta.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Float price;
    private LocalDate registrationDate;
    private String presentationImage;
    private String category;
    private String subcategory;
    private String brand;

    @JsonIgnore
    @OneToMany(targetEntity=OtherProductImages.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private List<OtherProductImages> selectedImages;

    @JsonIgnore
    @OneToMany(targetEntity= Size.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private List<Size> productSizes;

    @JsonIgnore
    @OneToMany(targetEntity=CartProduct.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private List<CartProduct> cartProducts;

    @JsonIgnore
    @OneToMany(targetEntity=OrderProduct.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private List<OrderProduct> orderProducts;

    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", presentationImage='" + presentationImage + '\'' +
                '}';
    }


}
