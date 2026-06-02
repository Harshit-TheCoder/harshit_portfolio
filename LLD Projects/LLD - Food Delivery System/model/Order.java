package model;
import java.util.*;
import observer.OrderNotifier;

public class Order {

    private int orderId;
    private Customer customer;
    private Restaurant restaurant;
    private List<FoodItem> items;
    private OrderStatus status;
    private OrderNotifier notifier;
    private DeliveryPartner deliveryPartner;

    public Order(int orderId, Customer customer, Restaurant restaurant, List<FoodItem> items){
        this.orderId = orderId;
        this.customer = customer;
        this.restaurant = restaurant;
        this.items = items;
        this.status = OrderStatus.PLACED;
        this.notifier = new OrderNotifier();
    }

    private Order(OrderBuilder builder){
        this.orderId = builder.orderId;
        this.customer = builder.customer;
        this.restaurant = builder.restaurant;
        this.items = builder.items;
        this.status = OrderStatus.PLACED;
        this.notifier = new OrderNotifier();
    }

    public static class OrderBuilder{

        private int orderId;
        private Customer customer;
        private Restaurant restaurant;
        private List<FoodItem> items;

        public OrderBuilder orderId(int orderId){
            this.orderId = orderId;
            return this;
        }

        public OrderBuilder customer(Customer customer){
            this.customer = customer;
            return this;
        }

        public OrderBuilder restaurant(Restaurant restaurant){
            this.restaurant = restaurant;
            return this;
        }

        public OrderBuilder items(List<FoodItem> items){
            this.items = items;
            return this;
        }

        public Order build(){
            return new Order(this);
        }
    }

    public OrderNotifier getNotifier(){
        return notifier;
    }

    public int getOrderId() {
        return orderId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public List<FoodItem> getItems() {
        return items;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
        notifier.notifyObservers("Order " + orderId + " status changed to " + status);
    }

    public double getTotalAmount() {

        double total = 0;
        for(FoodItem item : items) {
            total += item.getPrice();
        }
        return total;
    }

    public DeliveryPartner getDeliveryPartner() {
        return deliveryPartner;
    }

    public void setDeliveryPartner(DeliveryPartner deliveryPartner) {
        this.deliveryPartner = deliveryPartner;
    }
}
