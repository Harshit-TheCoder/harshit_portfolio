package repository;

import model.Order;
import java.util.*;

public class OrderRepository {
    
    private Map<Integer, Order> orders;
    public OrderRepository(){
        orders = new HashMap<>();
    }

    public void save(Order order){
        orders.put(order.getOrderId(), order);
    }

    public Order findById(int orderId){
        return orders.get(orderId);
    }

}
