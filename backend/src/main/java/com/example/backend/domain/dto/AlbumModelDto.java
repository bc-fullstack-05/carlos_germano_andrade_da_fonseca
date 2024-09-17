package com.example.backend.domain.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlbumModelDto {
    private String id;
    private String name;
    private String idSpotify;
    private String artistName;
    private String imageUrl;
    private String spotifyUrl;
    private BigDecimal value;

}
