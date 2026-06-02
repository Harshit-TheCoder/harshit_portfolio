package service;

import model.Ticket;
import strategy.PricingStrategy;

public class BillingService {
    private PricingStrategy pricingStrategy;
    public BillingService(PricingStrategy pricingStrategy){
        this.pricingStrategy = pricingStrategy;
    }

    public double generateBill(Ticket ticket){
        return pricingStrategy.calculateFee(ticket);
    }
}
