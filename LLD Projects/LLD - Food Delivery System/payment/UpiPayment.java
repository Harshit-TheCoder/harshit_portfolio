package payment;

public class UpiPayment extends PaymentProcessor{
    
    @Override
    public void processPayment(double amount){
        System.out.println("UPI Payment Success: ₹" + amount);
    }
}
