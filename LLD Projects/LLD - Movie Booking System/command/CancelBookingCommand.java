package command;

import model.Booking;
// import service.BookingService;
import proxy.BookingOperations;

public class CancelBookingCommand implements Command{
    
    // private BookingService bookingService;
    private BookingOperations bookingService;
    private Booking booking;

    public CancelBookingCommand(BookingOperations bookingService, Booking booking){
        this.bookingService = bookingService;
        this.booking = booking;
    }

    @Override
    public void execute(){
        bookingService.cancelBooking(booking);
    }
}
