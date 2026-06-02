package service;

import model.DeliveryPartner;
import strategy.DeliveryStrategy;
import java.util.*;

public class DeliveryService {
    
    private DeliveryStrategy strategy;

    public DeliveryService(DeliveryStrategy strategy){
        this.strategy = strategy;
    }

    public DeliveryPartner assignPartner(List<DeliveryPartner> partners){
        return strategy.assignPartner(partners);
    }
}
