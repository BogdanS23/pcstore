package ru.myprojects.pcstore.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.dto.UserDto;
import ru.myprojects.pcstore.entity.User;
import ru.myprojects.pcstore.mapper.UserMapper;
import ru.myprojects.pcstore.repository.UserRepository;
import ru.myprojects.pcstore.service.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public User create(User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Такое имя пользователя уде есть");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Такоя почта уже есть");
        }

        return save(user);
    }

    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public List<UserDto> getAll() {
        return repository.findAll().stream().map(user -> UserMapper.userToDto(user)).toList();
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    public User updateUserFromDto(UserDto userDto) {
        User user = this.getByUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setRole(userDto.getRole());
        return this.save(user);
    }

    public User updateUserPasswordFromDto(UserDto userDto) {
        User user = this.getByUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return this.save(user);
    }

}
