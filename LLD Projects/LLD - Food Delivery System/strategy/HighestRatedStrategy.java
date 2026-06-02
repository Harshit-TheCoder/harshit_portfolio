package strategy;

import model.DeliveryPartner;
import java.util.*;

public class HighestRatedStrategy implements DeliveryStrategy{

    @Override
    public DeliveryPartner assignPartner(List<DeliveryPartner> partners){

        DeliveryPartner best = null;
        double maxRating = -1;
        
        for(DeliveryPartner partner: partners){
            if(partner.isAvailable() && partner.getRating() > maxRating){
                maxRating = partner.getRating();
                best = partner;
            }
        }

        if(best != null){
            best.setAvailable(false);
        }

        return best;
    }
}