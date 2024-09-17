package com.example.backend.domain.services;

import com.example.backend.domain.dto.AlbumModelDto;
import com.example.backend.domain.dto.UserMetricsDto;
import com.example.backend.domain.dto.WalletDto;
import com.example.backend.domain.entities.Transaction;
import com.example.backend.domain.entities.User;
import com.example.backend.domain.repository.TransactionRepository;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.repository.WalletRepository;
import jakarta.transaction.UserTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionService {
    private final WalletService walletService;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final MetricService metricService;

    public List<UserMetricsDto> getUsersMetrics() {
      List<User> getAllUsers = userRepository.findAll();
     return getAllUsers.stream().map(user -> {
        return new UserMetricsDto(user.getName(),metricService.CalculateTotalValue(user.getTransactions()),metricService.CalculateTotalPoints(user.getTransactions()));
     }).toList();
    }

    public UserMetricsDto allMetrics() {
      List<Transaction> getTransaction = transactionRepository.findAll();
      Integer totalPoints = metricService.CalculateTotalPoints(getTransaction);
       BigDecimal totalValue = metricService.CalculateTotalValue(getTransaction);

       return new UserMetricsDto(null,totalValue,totalPoints);
    }




}
