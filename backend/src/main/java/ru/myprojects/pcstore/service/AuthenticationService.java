package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.dto.JwtAuthenticationResponse;
import ru.myprojects.pcstore.dto.SingInRequest;
import ru.myprojects.pcstore.dto.SingUpRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signUp(SingUpRequest request);
    JwtAuthenticationResponse signIn(SingInRequest request);
}
