package proxy;

import model.Booking;

public interface BookingOperations {
    void bookSeat(Booking booking);
    void cancelBooking(Booking booking);
}
