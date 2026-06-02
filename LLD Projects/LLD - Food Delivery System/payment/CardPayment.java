package payment;

public class CardPayment extends PaymentProcessor{
    
    @Override
    public void processPayment(double amount){
        System.out.println("Card Payment Success: ₹" + amount);
    }
}
