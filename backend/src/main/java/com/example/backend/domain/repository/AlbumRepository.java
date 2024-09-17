package com.example.backend.domain.repository;

import com.example.backend.domain.entities.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, String> {
}
