package command;

import model.Booking;
import proxy.BookingOperations;

public class BookSeatCommand implements Command{
    
    private BookingOperations bookingService;
    private Booking booking;
    
    public BookSeatCommand(BookingOperations bookingService, Booking booking){
        this.bookingService = bookingService;
        this.booking = booking;
    }

    @Override
    public void execute(){
        bookingService.bookSeat(booking);
    }
}
