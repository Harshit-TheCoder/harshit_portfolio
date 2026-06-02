package service;

import model.Order;
import repository.OrderRepository;

public class OrderService {
    
    private OrderRepository repository;
    public OrderService(OrderRepository repository){
        this.repository = repository;
    }

    public void placeOrder(Order order){
        repository.save(order);
        System.out.println("Order Placed : " + order.getOrderId());
    }

    public void updateStatus(Order order, model.OrderStatus status){
        order.setStatus(status);
    }
}
