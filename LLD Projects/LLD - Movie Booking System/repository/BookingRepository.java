package repository;

import java.util.*;
import model.Booking;

public class BookingRepository {

    private Map<Integer, Booking> bookings;
    
    public BookingRepository(){
        bookings = new HashMap<>();
    }

    public void save(Booking booking){
        bookings.put(booking.getBookingId(), booking);
    }

    public Booking findById(int bookingId){
        return bookings.get(bookingId);
    }
}
