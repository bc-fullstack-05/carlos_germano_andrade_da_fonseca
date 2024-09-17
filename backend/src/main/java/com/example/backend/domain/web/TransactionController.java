package com.example.backend.domain.web;


import com.example.backend.domain.dto.UserMetricsDto;
import com.example.backend.domain.services.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor

public class TransactionController {
    private final TransactionService transactionService;

    @Operation(summary = "List users metrics")
    @GetMapping("/users/metrics")
    public ResponseEntity<List<UserMetricsDto>> getUsersMetrics() {
        List<UserMetricsDto> userMetricsList = transactionService.getUsersMetrics();
        return ResponseEntity.ok(userMetricsList);

    }

    @Operation(summary = "get all metrics")
    @GetMapping("/metrics")
    public ResponseEntity<UserMetricsDto> getMetrics() {
        return ResponseEntity.ok(transactionService.allMetrics());
    }
}
