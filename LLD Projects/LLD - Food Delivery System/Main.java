import model.*;
import observer.CustomNotification;
import observer.RestuarantNotification;
import payment.PaymentProcessor;
import repository.OrderRepository;
import repository.PaymentRepository;
import service.DeliveryService;
import service.OrderService;
import service.PaymentService;
import strategy.FirstAvailableStrategy;
import strategy.HighestRatedStrategy;

import java.util.*;

import facade.FoodDeliveryFacade;
import factory.PaymentFactory;

public class Main{
    public static void main(String[] args) {

        OrderRepository repository = new OrderRepository();

        OrderService orderService = new OrderService(repository);

        DeliveryService deliveryService = new DeliveryService(new HighestRatedStrategy());

        PaymentService paymentService = new PaymentService();

        FoodDeliveryFacade facade = new FoodDeliveryFacade(orderService, deliveryService, paymentService);

        Customer customer = new Customer(1, "Harshit", "Kolkata");

        Restaurant restaurant = new Restaurant(101, "Pizza Hub", "Park Street");

        FoodItem pizza = new FoodItem(1, "Farmhouse Pizza", 299);

        FoodItem coke = new FoodItem(2, "Coke", 60);

        List<FoodItem> items = new ArrayList<>();

        items.add(pizza);

        items.add(coke);

        Order order = new Order.OrderBuilder().orderId(1001).customer(customer).restaurant(restaurant).items(items).build();

        order.getNotifier().addObserver(new CustomNotification());

        order.getNotifier().addObserver(new RestuarantNotification());

        List<DeliveryPartner> partners = new ArrayList<>();

        partners.add(new DeliveryPartner(1, "Rahul", 4.5));

        partners.add(new DeliveryPartner(2, "Aman", 4.9));

        partners.add(new DeliveryPartner(3, "Rohit", 4.2));

        facade.completeOrder(order, partners, "UPI");

        orderService.updateStatus(order, OrderStatus.PREPARING);

        orderService.updateStatus(order, OrderStatus.PICKED_UP);

        orderService.updateStatus(order, OrderStatus.DELIVERED);

        // Customer customer = new Customer(1, "Harshit Harlalka", "Kolkata");
        // Restaurant restaurant = new Restaurant(101, "Pizza Hut", "Park Street");
        // FoodItem pizza = new FoodItem(1, "Farmhouse Pizza", 299);
        // FoodItem coke = new FoodItem(2, "Coke" , 60);
        // List<FoodItem> items = new ArrayList<>();
        // items.add(pizza);
        // items.add(coke);
        // // Order order = new Order(1001, customer, restaurant, items);
        // Order order = new Order.OrderBuilder()
        //                     .orderId(1001)
        //                     .customer(customer)
        //                     .restaurant(restaurant)
        //                     .items(items)
        //                     .build();

        // OrderRepository repository = new OrderRepository();

        // repository.save(order);
        // Order fetched = repository.findById(1001);
        // System.out.println("Order ID : " + fetched.getOrderId());
        // System.out.println("Customer : " + fetched.getCustomer().getName());
        // System.out.println("Restaurant : " + fetched.getRestaurant().getName());
        // System.out.println("Status : " + fetched.getStatus());
        // System.out.println("Total : ₹" + fetched.getTotalAmount());

        // List<DeliveryPartner> partners = new ArrayList<>();

        // partners.add(new DeliveryPartner(1, "Rahul", 4.5));
        // partners.add(new DeliveryPartner(2, "Aman", 4.9));
        // partners.add(new DeliveryPartner(3, "Rohit", 4.2));

        // DeliveryService service = new DeliveryService(new FirstAvailableStrategy());
        // DeliveryPartner assigned = service.assignPartner(partners);
        // System.out.println("Assigned Partner : " + assigned.getName());

        // PaymentProcessor processor = PaymentFactory.createPayment("UPI");
        // PaymentService paymentService = new PaymentService();
        // paymentService.pay(processor, order.getTotalAmount());

        // PaymentRepository repo1 = PaymentRepository.getInstance();
        // PaymentRepository repo2 = PaymentRepository.getInstance();
        // System.out.println(repo1 == repo2);

        
    }
}