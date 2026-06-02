package model;

public class Seat{

    private int seatNumber;
    private boolean booked;

    public Seat(int seatNumber){
        this.seatNumber = seatNumber;
        this.booked = false;
    }

    public int getSeatNumber(){
        return seatNumber;
    }

    public boolean isBooked(){
        return booked;
    }

    public void setBooked(boolean booked){
        this.booked = booked;
    }
}