package com.example.backend.domain.web;

import com.example.backend.domain.dto.CreditWalletDto;
import com.example.backend.domain.dto.WalletDto;
import com.example.backend.domain.entities.Wallet;
import com.example.backend.domain.services.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/wallet")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService walletService;


    @Operation(summary = "add credit")
   @PostMapping("/credit")
    public ResponseEntity <Void> addCredit(@RequestBody CreditWalletDto creditWalletDto) {
       walletService.addCredit(creditWalletDto.getAmount());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "get value wallet by id ")
    @GetMapping("{walletId}")
    public ResponseEntity<WalletDto> getWalletId(@PathVariable String walletId) {
       return ResponseEntity.ok(walletService.getWalletId(walletId));
    }
}
