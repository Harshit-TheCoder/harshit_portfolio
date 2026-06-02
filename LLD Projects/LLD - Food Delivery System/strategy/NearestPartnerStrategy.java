package strategy;

import model.DeliveryPartner;
import java.util.*;

public class NearestPartnerStrategy implements DeliveryStrategy{
    
    @Override
    public DeliveryPartner assignPartner(List<DeliveryPartner> partners){
        return partners.get(0);
    }
}
