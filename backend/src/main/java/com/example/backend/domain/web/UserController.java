package com.example.backend.domain.web;

import com.example.backend.domain.dto.UserRequestDto;
import com.example.backend.domain.dto.UserResponseDto;
import com.example.backend.domain.entities.User;
import com.example.backend.domain.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "creat user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "user created"),
    })
    @PostMapping("/signUp")
    public ResponseEntity<UserResponseDto> saveUser(@RequestBody UserRequestDto userRequest) {
        return ResponseEntity.ok(userService.CreateUser(userRequest));
    }

    @Operation(summary = "auth user")
    @PostMapping("/auth")
    public ResponseEntity<String> auth(@RequestBody UserRequestDto user){
        return ResponseEntity.ok(this.userService.auth(user));
    }

    @Operation(summary = "list users")
    @GetMapping("")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(summary = "get user by id")
    @GetMapping("{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @Operation(summary = "update user")
    @PutMapping("/update")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody UserRequestDto userRequest) {
        UserResponseDto updatedUser = userService.updateUser(userRequest);
        return ResponseEntity.ok(updatedUser);
    }
}
