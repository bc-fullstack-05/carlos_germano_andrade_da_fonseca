package com.example.backend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Wallet {
    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @Column(name = "points", nullable = false)
    private Integer points;

    @UpdateTimestamp
    @Column(name = "lastupdate")
    private LocalDateTime lastUpdate;


    @OneToOne(mappedBy = "wallet")
    private User user;
}
