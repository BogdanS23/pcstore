package ru.myprojects.pcstore.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.Order;
import ru.myprojects.pcstore.repository.OrderRepository;
import ru.myprojects.pcstore.service.OrderService;

import java.beans.Transient;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findOrdersByUserId(userId);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Не найден такой заказ!"));
        order.setPcList(orderDetails.getPcList());
        order.setStatus(orderDetails.getStatus());
        order.setUserId(orderDetails.getUserId());
        Order updatedOrder = orderRepository.save(order);
        return updatedOrder;
    }
}
