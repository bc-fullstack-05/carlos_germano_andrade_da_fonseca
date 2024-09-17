package com.example.backend.domain.services;

import com.example.backend.domain.dto.WalletDto;
import com.example.backend.domain.entities.User;
import com.example.backend.domain.entities.Wallet;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public Wallet createWallet(User user) {
        Wallet wallet = new Wallet();
        wallet.setPoints(0);
        wallet.setBalance(new BigDecimal(100));
        wallet.setUser(user);
        return walletRepository.save(wallet);
    }

    public Integer calculatePointsBasedOnDayOfWeek() {
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        int points = 0;

        switch (dayOfWeek) {
            case MONDAY -> points = 7;
            case TUESDAY -> points = 6;
            case WEDNESDAY -> points = 2;
            case THURSDAY -> points = 10;
            case FRIDAY -> points = 15;
            case SATURDAY -> points = 20;
            case SUNDAY -> points = 25;
        }

        return points;
    }


    public void updateWalletPoints(Wallet wallet) {
        log.info("assigning points");
        Integer points = calculatePointsBasedOnDayOfWeek();
        wallet.setPoints(wallet.getPoints() + points);
        walletRepository.save(wallet);

    }

    public void addCredit(BigDecimal amount) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByEmail(currentPrincipalName).orElseThrow();
        user.getWallet().setBalance(user.getWallet().getBalance().add(amount));
        userRepository.save(user);
    }

    public WalletDto getWalletId(String id) {
        Optional<Wallet> walletOpt = walletRepository.findById(id);

            Wallet wallet = walletOpt.get();

            return WalletDto.builder()
                    .balance(wallet.getBalance())
                    .points(wallet.getPoints())
                    .lastUpdate(wallet.getLastUpdate())
                    .build();

    }
}
