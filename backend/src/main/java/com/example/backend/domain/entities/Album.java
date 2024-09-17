package com.example.backend.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "album")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Album {
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "idSpotify", nullable = false)
    private String idSpotify;

    @Column(name = "artistName", nullable = false)
    private String artistName;

    @Column(name = "imageUrl", nullable = false)
    private String imageUrl;

    @Column(name = "spotifyUrl", nullable = false)
    private String spotifyUrl;

    @Column(name = "value", nullable = false)
    private BigDecimal value;

    @Column(name = "deletedAt")
    private LocalDateTime deletedAt;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "album")
    private Transaction transaction;
}
