package com.example.backend.domain.services;

import com.example.backend.domain.entities.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MetricService {
   public BigDecimal CalculateTotalValue(List<Transaction> transactions){
   return  transactions.stream().map(Transaction::getValue).reduce(BigDecimal.ZERO, BigDecimal::add);
   };

   public Integer CalculateTotalPoints(List<Transaction> transaction){
      return transaction.stream().map(Transaction::getPointsEaned).reduce(0, Math::addExact);
   }


}
