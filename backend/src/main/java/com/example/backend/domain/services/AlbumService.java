package com.example.backend.domain.services;

import com.example.backend.domain.dto.AlbumDto;
import com.example.backend.domain.dto.AlbumModelDto;
import com.example.backend.domain.entities.Album;
import com.example.backend.domain.entities.Transaction;
import com.example.backend.domain.entities.User;
import com.example.backend.domain.repository.AlbumRepository;
import com.example.backend.domain.repository.TransactionRepository;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.services.integration.SpotifyApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class AlbumService {

    private final SpotifyApiClient spotifyApiClient;

    private final UserRepository userRepository;

    private final AlbumRepository albumRepository;

    private final WalletService walletService;

    private final TransactionRepository transactionRepository;


    public List<AlbumDto> listAllAlbumns(String search) {
    log.info("Request to list all albums");

        return spotifyApiClient.getAlbums(search);
    }

    public List<AlbumModelDto> getUserAlbum(String user_id) {
        log.info("Request to get user albums");
        User user = userRepository.findById(user_id).orElseThrow();
        return user.getAlbums().stream().map(album -> {
            return AlbumModelDto.builder().idSpotify(album.getIdSpotify())
                    .id(album.getId())
                    .artistName(album.getArtistName())
                    .name(album.getName())
                    .imageUrl(album.getImageUrl())
                    .value(album.getValue()).spotifyUrl(album.getSpotifyUrl()).build();
        }).toList();
    }

    public boolean albumExists(AlbumModelDto albumModelDto, List<Album> albums) {
        for (Album album : albums) {
            if (album.getIdSpotify().equals(albumModelDto.getIdSpotify())) {
                return true;
            }
        }
        return false;
    }



    public void saleAlbum(AlbumModelDto albumModelDto) {
        log.info("Request to sale album");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        User user = userRepository.findByEmail(currentPrincipalName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double userbalance = user.getWallet().getBalance().doubleValue();

        if(userbalance >= 0 && userbalance - albumModelDto.getValue().doubleValue() >= 0){
            log.info("User has sufficient balance");
            Album newAlbum = new Album();
            newAlbum.setIdSpotify(albumModelDto.getIdSpotify());
            newAlbum.setName(albumModelDto.getName());
            newAlbum.setArtistName((albumModelDto.getArtistName()));
            newAlbum.setImageUrl((albumModelDto.getImageUrl()));
            newAlbum.setSpotifyUrl((albumModelDto.getSpotifyUrl()));
            newAlbum.setValue(albumModelDto.getValue());
            newAlbum.setUser(user);
            Album createdAlbum = albumRepository.save(newAlbum);



            if (albumExists(albumModelDto, user.getAlbums())) {
            log.info("User does not have a duplicate album");
                user.getAlbums().add(createdAlbum);
                user.getWallet().setBalance(user.getWallet().getBalance().subtract(createdAlbum.getValue()));
               user = userRepository.save(user);

                walletService.updateWalletPoints(user.getWallet());

                Transaction transaction = Transaction.builder()
                        .value(createdAlbum.getValue())
                        .pointsEaned(walletService.calculatePointsBasedOnDayOfWeek())
                        .album(createdAlbum)
                        .user(user)
                        .build();

                transactionRepository.save(transaction);
            }else {
                throw new RuntimeException("Album is already sold");
            }

        }else {
            throw new RuntimeException("User has sufficient balance");
        }
    }

    public void DeleteAlbum (String album_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        User user = userRepository.findByEmail(currentPrincipalName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getAlbums().removeIf(album -> album.getId().equals(album_id));
        userRepository.save(user);
      Album deletedAlbum = albumRepository.findById(album_id).orElseThrow();
      deletedAlbum.setUser(null);
      deletedAlbum.setDeletedAt(LocalDateTime.now());

      albumRepository.save(deletedAlbum);

    }

}