package strategy;
import model.DeliveryPartner;
import java.util.*;

public interface DeliveryStrategy {
    DeliveryPartner assignPartner(List<DeliveryPartner> partners);
}
