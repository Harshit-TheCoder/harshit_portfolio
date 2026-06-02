package strategy;
import model.Ticket;
import java.time.Duration;
import java.time.LocalDateTime;

public class HourlyPricing implements PricingStrategy{

    @Override
    public double calculateFee(Ticket ticket){
        long hours = Duration.between(
            ticket.getEntryTime(),
            LocalDateTime.now()
        ).toHours();

        if(hours == 0) hours = 1;
        return hours*50;
    }
}