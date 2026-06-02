package service;

import payment.PaymentProcessor;
import repository.PaymentRepository;

public class PaymentService {

    private PaymentRepository repository;

    public PaymentService(){
        repository = PaymentRepository.getInstance();
    }

    public void pay(PaymentProcessor processor, double amount){
        processor.makePayment(amount);
        repository.save("Payment Completed : ₹" + amount);
    }

}
