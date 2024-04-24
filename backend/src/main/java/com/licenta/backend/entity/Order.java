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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate orderDate;
    private String status;
    private String shippingOption;


    private String deliveryAddress;
    private String deliveryCity;
    private String deliveryRegion;
    private String deliveryCountry;
    private String deliveryPostalCode;
    private String deliveryPhoneNumber;
    private String BillingAddress;
    private String BillingCity;
    private String BillingRegion;
    private String BillingCountry;
    private String BillingPostalCode;
    private String BillingPhoneNumber;


    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private List<OrderProduct> orderProducts;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderDate=" + orderDate +
                ", status='" + status + '\'' +
                '}';
    }

}
