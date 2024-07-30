package ru.myprojects.pcstore.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.myprojects.pcstore.dto.JwtAuthenticationResponse;
import ru.myprojects.pcstore.dto.SingInRequest;
import ru.myprojects.pcstore.dto.SingUpRequest;
import ru.myprojects.pcstore.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SingUpRequest request) {
        return authenticationService.signUp(request);
    }

    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SingInRequest request) {
        return authenticationService.signIn(request);
    }
}
