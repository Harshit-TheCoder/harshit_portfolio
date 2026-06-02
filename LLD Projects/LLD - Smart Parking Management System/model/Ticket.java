package model;
import java.time.LocalDateTime;;

public class Ticket{
    private int ticketId;
    private Vehicle vehicle;
    private ParkingSpot spot;
    private LocalDateTime entryTime;

    private Ticket(TicketBuilder builder){
        this.ticketId = builder.ticketId;
        this.vehicle = builder.vehicle;
        this.spot = builder.spot;
        this.entryTime = builder.entryTime;
    }

    public static class TicketBuilder{

        private int ticketId;
        private Vehicle vehicle;
        private ParkingSpot spot;
        private LocalDateTime entryTime;

        public TicketBuilder ticketId(int ticketId){
            this.ticketId = ticketId;
            return this;
        }

        public TicketBuilder vehicle(Vehicle vehicle){
            this.vehicle = vehicle;
            return this;
        }

        public TicketBuilder spot(ParkingSpot spot){
            this.spot = spot;
            return this;
        }

        public TicketBuilder entryTime(LocalDateTime entryTime){
            this.entryTime = entryTime;
            return this;
        }

        public Ticket build(){
            return new Ticket(this);
        }
    }
    
    public Ticket(int ticketId, Vehicle vehicle, ParkingSpot spot){
        this.ticketId = ticketId;
        this.vehicle = vehicle;
        this.spot = spot;
        this.entryTime = LocalDateTime.now();
    }
    public int getTicketId(){
        return ticketId;
    }
    public Vehicle getVehicle(){
        return vehicle;
    }
    public ParkingSpot geSpot(){
        return spot;
    }
    public LocalDateTime getEntryTime(){
        return entryTime;
    }
}