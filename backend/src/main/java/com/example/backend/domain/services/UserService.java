package com.example.backend.domain.services;

import com.example.backend.domain.dto.UserRequestDto;
import com.example.backend.domain.dto.UserResponseDto;
import com.example.backend.domain.entities.User;
import com.example.backend.domain.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService  implements UserDetailsService {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final WalletService walletService;

    private final PasswordEncoder passwordEncoder;



    public UserResponseDto CreateUser(UserRequestDto userRequest) {
        User user = new User();
        user.setName(userRequest.getUsername());
        user.setPassword(this.passwordEncoder.encode(userRequest.getPassword()));
        user.setEmail(userRequest.getEmail());
        User createUserNoWallet = userRepository.save(user);
        createUserNoWallet.setWallet(walletService.createWallet(createUserNoWallet));
        User savedUser = userRepository.save(createUserNoWallet);
        return UserResponseDto.builder().id(savedUser.getId()).username(savedUser.getName()).email(savedUser.getEmail()).build();
    }


    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> UserResponseDto.builder()
                        .id(user.getId())
                        .username(user.getName())
                        .email(user.getEmail())
                        .build())
                .collect(Collectors.toList());
    }

    public UserResponseDto getUserById(String userResponseDto) {
        User user = new User();
        user.getName();
        user.getPassword();
        user.getEmail();
        User getUser = userRepository.getReferenceById(userResponseDto);
        return UserResponseDto.builder().id(getUser.getId()).username(getUser.getName()).email(getUser.getEmail()).build();
    }

    public UserResponseDto updateUser(UserRequestDto userRequest) {
        User user = userRepository.findById(userRequest.getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userRequest.getId()));

        user.setName(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(this.passwordEncoder.encode(userRequest.getPassword()));
        User updatedUser = userRepository.save(user);

        return UserResponseDto.builder()
                .id(updatedUser.getId())
                .username(updatedUser.getName())
                .email(updatedUser.getEmail())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = this.userRepository.findByEmail(username);

        return optionalUser.map(users -> new org.springframework.security.core.userdetails.User(users.getEmail(), users.getPassword(), new ArrayList<GrantedAuthority>()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + username));
    }

    public String auth(UserRequestDto user) {

        User u = this.userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("Invalid user credentials!"));
        if(!this.passwordEncoder.matches(user.getPassword(), u.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }
        return this.jwtService.generateToken(u);
    }
}
