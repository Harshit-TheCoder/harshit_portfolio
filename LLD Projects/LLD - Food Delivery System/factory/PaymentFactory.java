package factory;

import payment.CardPayment;
import payment.CashPayment;
import payment.PaymentProcessor;
import payment.UpiPayment;

public class PaymentFactory {

    public static PaymentProcessor createPayment(String type){

        switch (type.toUpperCase()) {
            case "UPI":
                return new UpiPayment();
            case "CARD":
                return new CardPayment();
            case "CASH":
                return new CashPayment();
            default:
                throw new RuntimeException("Invalid Payment");
        }
    }
}
