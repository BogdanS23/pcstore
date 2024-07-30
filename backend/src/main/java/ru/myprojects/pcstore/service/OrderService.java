package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<Order> getAllOrders();
    Optional<Order> getOrderById(Long id);
    Order createOrder(Order order);
    void deleteOrder(Long id);
    List<Order> getOrdersByUserId(Long userId);
    Order updateOrder(Long id, Order orderDetails);
}
