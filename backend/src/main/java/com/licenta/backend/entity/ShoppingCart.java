package com.licenta.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    private Long id;

    private int quantity;
    private String size;
    private String name;
    private float price; //nuj daca are rost
    private String presentationImage; //nuj daca are rost

    //produce one to many relationship
    //user one to one



}
