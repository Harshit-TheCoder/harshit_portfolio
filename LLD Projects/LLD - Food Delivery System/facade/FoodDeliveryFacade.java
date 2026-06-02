package facade;

import model.*;
import payment.PaymentProcessor;
import service.*;
import factory.PaymentFactory;
import java.util.*;

public class FoodDeliveryFacade {
    
    private OrderService orderService;
    private DeliveryService deliveryService;
    private PaymentService paymentService;

    public FoodDeliveryFacade(OrderService orderService, DeliveryService deliveryService, PaymentService paymentService){
        this.orderService = orderService;
        this.deliveryService = deliveryService;
        this.paymentService = paymentService;
    }

    public void completeOrder(Order order, List<DeliveryPartner> partners, String paymentType){
        DeliveryPartner partner = deliveryService.assignPartner(partners);
        order.setDeliveryPartner(partner);
        System.out.println("Assigned Partner : " + partner.getName());
        PaymentProcessor processor = PaymentFactory.createPayment(paymentType);
        paymentService.pay(processor, order.getTotalAmount());
        orderService.placeOrder(order);
    }
}
