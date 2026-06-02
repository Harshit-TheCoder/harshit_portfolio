import model.*;
import nullobject.UserInterface;
import nullobject.UserRepository;
import proxy.BookingOperations;
import proxy.BookingServiceProxy;
import repository.BookingRepository;

import java.util.*;

import command.Command;
import command.BookSeatCommand;
import command.BookingInvoker;
import command.CancelBookingCommand;

import composite.ScreenComposite;
import composite.SeatLeaf;
import composite.TheatreComposite;

import iterator.SeatCollection;
import iterator.SeatIterator;

public class Main {

    public static void main(String[] args) {

        User user = new User(1, "Harshit");

        Movie movie = new Movie(101, "Interstellar", 169);

        List<Seat> seats = new ArrayList<>();

        seats.add(new Seat(1));
        seats.add(new Seat(2));
        seats.add(new Seat(3));
        seats.add(new Seat(4));
        seats.add(new Seat(5));

        Screen screen = new Screen(1, seats);

        List<Screen> screens = new ArrayList<>();

        screens.add(screen);

        Theatre theatre = new Theatre(1, "PVR Kolkata", screens);

        Seat selectedSeat = screen.getSeats().get(0);

        Booking booking = new Booking(1001, user, movie, selectedSeat);

        BookingOperations bookingService = new BookingServiceProxy(true);

        BookingInvoker invoker = new BookingInvoker();

        Command bookCommand = new BookSeatCommand(bookingService, booking);

        invoker.executeCommand(bookCommand);

        BookingRepository repository = new BookingRepository();

        repository.save(booking);

        Booking fetched = repository.findById(1001);

        System.out.println("Booking Id : " + fetched.getBookingId());
        System.out.println("User : " + fetched.getUser().getName());
        System.out.println("Movie : " + fetched.getMovie().getTitle());
        System.out.println("Seat : " + fetched.getSeat().getSeatNumber());
        System.out.println("Status : " + fetched.getStatus());
        System.out.println("Theatre : " + theatre.getTheatreName());

        Command cancelCommand = new CancelBookingCommand(bookingService, booking);

        invoker.executeCommand(cancelCommand);

        System.out.println("\n===== Composite Pattern Demo =====");

        TheatreComposite theatreComposite = new TheatreComposite("PVR Kolkata");

        ScreenComposite screenComposite = new ScreenComposite(1);

        screenComposite.add(new SeatLeaf(1));
        screenComposite.add(new SeatLeaf(2));
        screenComposite.add(new SeatLeaf(3));

        theatreComposite.add(screenComposite);

        theatreComposite.display();

        System.out.println("\n===== Iterator Pattern Demo =====");

        List<Seat> iteratorSeats = new ArrayList<>();

        iteratorSeats.add(new Seat(1));
        iteratorSeats.add(new Seat(2));
        iteratorSeats.add(new Seat(3));

        iteratorSeats.get(1).setBooked(true);

        SeatCollection collection = new SeatCollection(iteratorSeats);

        SeatIterator iterator = collection.createIterator();

        while(iterator.hasNext()) {
            System.out.println("Available Seat : " + iterator.next().getSeatNumber());
        }

        UserRepository userRepository = new UserRepository();
        UserInterface user1 = userRepository.findUser(1);
        UserInterface user2 = userRepository.findUser(999);
        System.out.println(user1.getName());
        System.out.println(user2.getName());
        System.out.println(user2.isGuest());
    }
}