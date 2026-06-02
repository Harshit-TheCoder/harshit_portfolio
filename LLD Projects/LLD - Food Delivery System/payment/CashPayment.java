package payment;

public class CashPayment extends PaymentProcessor {

    @Override
    protected void processPayment(double amount) {
        System.out.println("Cash Payment Received : ₹" + amount);
    }
}