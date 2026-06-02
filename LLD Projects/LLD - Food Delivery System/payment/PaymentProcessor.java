package payment;

public abstract class PaymentProcessor {
    
    public final void makePayment(double amount){
        validate(amount);
        processPayment(amount);
        generateReceipt(amount);
    }

    protected void validate(double amount){
        if(amount <= 0){
            throw new IllegalArgumentException("Invalid Amount");
        }
    }

    protected abstract void processPayment(double amount);

    protected void generateReceipt(double amount){
        System.out.println("Receipt Generated For ₹" + amount);
    }
}
