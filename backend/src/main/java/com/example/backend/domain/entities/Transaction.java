package com.example.backend.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.ManyToAny;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {
    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "value")
    private BigDecimal value;

    @CreationTimestamp
    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "pointsEaned")
    private Integer pointsEaned;

    @OneToOne
    @JoinColumn(name = "album_id")
    private Album album;

   @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
