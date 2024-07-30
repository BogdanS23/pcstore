package ru.myprojects.pcstore.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.myprojects.pcstore.entity.Order;
import ru.myprojects.pcstore.entity.enums.OrderStatus;
import ru.myprojects.pcstore.entity.enums.Role;
import ru.myprojects.pcstore.entity.User;
import ru.myprojects.pcstore.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getPrincipal());
        User user = (User) auth.getPrincipal();
        if (user != null && user.getRole() == Role.ROLE_ADMIN) {
            return orderService.getAllOrders();
        }
        else if (user != null && user.getRole() == Role.ROLE_USER) {
            return orderService.getOrdersByUserId(user.getId());
        }
        else return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(order -> {
                    // Логирование pcList
                    logger.info("PC List: {}", order.getPcList());
                    return ResponseEntity.ok(order);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setStatus(OrderStatus.CREATED);
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Order updatedOrder = orderService.updateOrder(id, orderDetails);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Delete successfully!");
    }
}
