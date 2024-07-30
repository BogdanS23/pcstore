package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.myprojects.pcstore.dto.UserDto;
import ru.myprojects.pcstore.service.UserService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto){
        userService.updateUserFromDto(userDto);
        return ResponseEntity.ok("Completed");
    }

    @PutMapping("/{id}/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody UserDto userDto){
        userService.updateUserPasswordFromDto(userDto);
        return ResponseEntity.ok("Completed changing password");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deletePowerSupply(@PathVariable("id") Long userId) {
        userService.deleteById(userId);
        return ResponseEntity.ok("Delete successfully!");
    }
}
