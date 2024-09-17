package com.example.backend.domain.services.integration;

import com.example.backend.domain.dto.AlbumDto;
import com.neovisionaries.i18n.CountryCode;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Slf4j
@Service
public class SpotifyApiClient {

    private final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId("05d7314678d04c458492b75fecc8c8bb")
            .setClientSecret("086309851e004f4abf894216499dc837")
            .build();


    public List<AlbumDto> getAlbums(String search) {
        try {
            log.info("Getting albums from Spotify");
            spotifyApi.setAccessToken(getAccessToken());
            var albums = spotifyApi.searchAlbums(search).market(CountryCode.BR).limit(30).build()
                    .execute().getItems();
            List<AlbumDto> albumDtos = new java.util.ArrayList<>(List.of());
            for (var album : albums) {
                albumDtos.add(AlbumDto.builder()
                        .albumType(album.getAlbumType())
                        .artists(album.getArtists())
                        .externalUrls(album.getExternalUrls())
                        .id(album.getId())
                        .images(album.getImages())
                        .name(album.getName())
                        .releaseDate(album.getReleaseDate())
                        .type(album.getType())
                        .value(BigDecimal.valueOf(Math.random() * ((100.00 - 12.00) + 1) + 12.00).setScale(2, RoundingMode.UP))
                        .build());
            }
            log.info("Albums from Spotify retrieved successfully");
            return albumDtos;
        } catch (IOException | SpotifyWebApiException | ParseException ex) {
            log.error("Error while trying to get albums from Spotify", ex);
            throw new RuntimeException(ex);
        }

    }

    public AlbumDto getAlbumId(String id) {
        try {
            log.info("Getting album by ID from Spotify: " + id);
            spotifyApi.setAccessToken(getAccessToken());

            var album = spotifyApi.getAlbum(id).build().execute();

            AlbumDto albumDto = AlbumDto.builder()
                    .albumType(album.getAlbumType())
                    .artists(album.getArtists())
                    .externalUrls(album.getExternalUrls())
                    .id(album.getId())
                    .images(album.getImages())
                    .name(album.getName())
                    .releaseDate(album.getReleaseDate())
                    .type(album.getType())
                    .value(BigDecimal.valueOf(Math.random() * ((100.00 - 12.00) + 1) + 12.00).setScale(2, RoundingMode.UP))
                    .build();

            log.info("Album retrieved successfully from Spotify");
            return albumDto;

        } catch (IOException | SpotifyWebApiException | ParseException ex) {
            log.error("Error while trying to get album by ID from Spotify", ex);
            throw new RuntimeException(ex);
        }
    }



    private String getAccessToken() throws IOException, ParseException, SpotifyWebApiException {
        ClientCredentialsRequest clientCredentialsRequest = this.spotifyApi.clientCredentials().build();
        return clientCredentialsRequest.execute().getAccessToken();
    }

}