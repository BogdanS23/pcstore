package ru.myprojects.pcstore.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.myprojects.pcstore.entity.enums.Role;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private Role role;
}
