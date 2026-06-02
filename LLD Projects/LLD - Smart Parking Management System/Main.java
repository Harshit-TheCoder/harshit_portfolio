import decorator.*;
import factory.VehicleFactory;
import model.*;
import observer.*;
import service.*;
import strategy.*;

import java.time.LocalDateTime;

public class Main {

    public static void main(String[] args)
            throws Exception {

        // ---------------------------
        // Observer Setup
        // ---------------------------

        ParkingNotifier notifier = new ParkingNotifier();
        notifier.addObserver(new SMSNotification());
        notifier.addObserver(new EmailNotification());
        notifier.addObserver(new DisplayBoard());

        // ---------------------------
        // Services
        // ---------------------------

        ParkingService parkingService = new ParkingService(5, notifier);
        BillingService billingService = new BillingService(new HourlyPricing());

        // ---------------------------
        // Factory Pattern
        // ---------------------------

        Vehicle vehicle = VehicleFactory.createVehicle(VehicleType.CAR,"WB08E5754");

        // ---------------------------
        // Parking
        // ---------------------------

        ParkingSpot spot = parkingService.assignSpot();

        if (spot == null) {
            System.out.println( "Parking Full");
            return;
        }

        // ---------------------------
        // Builder Pattern
        // ---------------------------

        Ticket ticket = new Ticket.TicketBuilder().ticketId(1).vehicle(vehicle).spot(spot).entryTime(LocalDateTime.now()).build();
        System.out.println("\nTicket Created");
        System.out.println("Vehicle : "+ vehicle.getVehicleNumber());
        System.out.println("Spot : "+ spot.getSpotId());

        // simulate parking duration

        Thread.sleep(5000);

        // ---------------------------
        // State Pattern
        // ---------------------------

        System.out.println("\nState Pattern Demo");
        spot.leave();
        spot.leave();
        spot.park();

        // ---------------------------
        // Decorator Pattern
        // ---------------------------

        BillComponent bill =new BasicParkingBill();
        bill =new EVChargingDecorator(bill);
        bill = new PremiumSpotDecorator(bill);
        System.out.println("\nAdditional Services");
        System.out.println(bill.getDescription());
        System.out.println("Addon Cost = ₹"+ bill.getCost());

        // ---------------------------
        // Strategy Pattern
        // ---------------------------

        double parkingFee =billingService.generateBill(ticket);
        System.out.println("\nParking Fee = ₹"+ parkingFee);
        double finalAmount =parkingFee+ bill.getCost();
        System.out.println("\nFinal Bill = ₹"+ finalAmount);
    }
}