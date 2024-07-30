package ru.myprojects.pcstore.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.dto.JwtAuthenticationResponse;
import ru.myprojects.pcstore.dto.SingInRequest;
import ru.myprojects.pcstore.dto.SingUpRequest;
import ru.myprojects.pcstore.entity.enums.Role;
import ru.myprojects.pcstore.entity.User;
import ru.myprojects.pcstore.service.AuthenticationService;
import ru.myprojects.pcstore.service.JwtService;
import ru.myprojects.pcstore.service.UserService;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signUp(SingUpRequest request) {

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .phone(request.getPhone())
                .build();

        userService.create(user);

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }

    public JwtAuthenticationResponse signIn(SingInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }
}
