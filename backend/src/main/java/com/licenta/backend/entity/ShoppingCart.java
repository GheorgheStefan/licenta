package com.licenta.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "shopping_carts")
public class ShoppingCart {

    @Id
    private Long id;

    private int quantity;
    private String size;
    private String name;
    private float price; //nuj daca are rost
    private String presentationImage; //nuj daca are rost

    @ManyToMany
    @JoinTable(
            name = "cart_produts",
            joinColumns = @JoinColumn(name = "shopping_cart_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Product> productList;

    //produce one to many relationship
    //user one to one



}
