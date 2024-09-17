package com.example.backend.domain.web;

import com.example.backend.domain.dto.AlbumDto;
import com.example.backend.domain.dto.AlbumModelDto;
import com.example.backend.domain.services.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @Operation(summary = "find all Albums")
    @GetMapping("/all/{search}")
    public ResponseEntity<List<AlbumDto>> findAllByName(@PathVariable String search) {
      return ResponseEntity.ok().body(albumService.listAllAlbumns(search));
    }

    @Operation(summary = "find Album by id")
    @GetMapping("/my-collection/{userId}")
    public ResponseEntity <List <AlbumModelDto>> findAllByUserId(@PathVariable String userId) {
        return ResponseEntity.ok().body(albumService.getUserAlbum(userId));
    }

    @Operation(summary = "Sale Album")
    @PostMapping("/sale")
    public ResponseEntity save(@RequestBody AlbumModelDto albumModelDtoDto) {
        albumService.saleAlbum(albumModelDtoDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Remove Album for id")
    @DeleteMapping("/remove/{id}")
    public ResponseEntity remove(@PathVariable String id) {
        albumService.DeleteAlbum(id);
        return ResponseEntity.ok().build();
    }
}
