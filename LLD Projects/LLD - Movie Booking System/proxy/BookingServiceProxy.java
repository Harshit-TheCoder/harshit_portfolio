package proxy;

import model.Booking;
import service.BookingService;

public class BookingServiceProxy implements BookingOperations{
    
    private BookingService bookingService;
    private boolean authenticated;

    public BookingServiceProxy(boolean authenticated){
        this.bookingService = new BookingService();
        this.authenticated = authenticated;
    }

    @Override
    public void bookSeat(Booking booking){
        if(!authenticated){
            System.out.println("Access Denied");
            return;
        }

        System.out.println("Logging Book Request");
        bookingService.bookSeat(booking);
    }

    @Override
    public void cancelBooking(Booking booking){
        if(!authenticated){
            System.out.println("Access Denied");
            return;
        }

        System.out.println("Logging Cancel Request");
        bookingService.cancelBooking(booking);
    }
}
