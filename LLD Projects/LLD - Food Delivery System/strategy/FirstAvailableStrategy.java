package strategy;

import model.DeliveryPartner;
import java.util.*;

public class FirstAvailableStrategy implements DeliveryStrategy{
    
    @Override
    public DeliveryPartner assignPartner(List<DeliveryPartner> partners){
        
        for(DeliveryPartner partner: partners){
            if(partner.isAvailable()){
                partner.setAvailable(false);
                return partner;
            }
        }
        return null;
    }
}
