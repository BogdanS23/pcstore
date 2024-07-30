package ru.myprojects.pcstore.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.myprojects.pcstore.dto.UserDto;
import ru.myprojects.pcstore.entity.User;
import ru.myprojects.pcstore.mapper.UserMapper;

import java.util.List;

public interface UserService {
    User save(User user);
    User create(User user);
    User getByUsername(String username);
    List<UserDto> getAll();
    void deleteById(Long id);
    UserDetailsService userDetailsService();
    User updateUserFromDto(UserDto userDto);
    User updateUserPasswordFromDto(UserDto userDto);
}
