package ru.myprojects.pcstore.mapper;

import ru.myprojects.pcstore.dto.UserDto;
import ru.myprojects.pcstore.entity.User;

public class UserMapper {

    public static User dtoToUser(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setRole(dto.getRole());
        return user;
    }

    public static UserDto userToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setRole(user.getRole());
        return userDto;
    }


}
