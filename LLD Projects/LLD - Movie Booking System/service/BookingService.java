package service;

import model.Booking;
import model.BookingStatus;
import proxy.BookingOperations;

public class BookingService implements BookingOperations{

    public void bookSeat(Booking booking){
        if(booking.getSeat().isBooked()){
            System.out.println("Seat Already Booked");
            return;
        }
        booking.getSeat().setBooked(true);
        booking.setStatus(BookingStatus.CONFIRMED);
        System.out.println("Booking confirmed");
    }

    public void cancelBooking(Booking booking){
        booking.getSeat().setBooked(false);
        booking.setStatus(BookingStatus.CANCELLED);
        System.out.println("Booking Cancelled");
    }
}