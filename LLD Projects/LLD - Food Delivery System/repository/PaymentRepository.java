package repository;

import java.util.*;

public class PaymentRepository {
    
    private static PaymentRepository instance;
    private List<String> payments;

    private PaymentRepository(){
        payments = new ArrayList<>();
    }

    public static PaymentRepository getInstance(){
        if(instance == null){
            instance = new PaymentRepository();
        }
        return instance;
    }

    public void save(String paymentRecord){
        payments.add(paymentRecord);
    }

    public List<String> getPayments(){
        return payments;
    }
}
