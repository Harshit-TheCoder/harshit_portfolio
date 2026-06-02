package iterator;

import model.Seat;
import java.util.*;

public class SeatCollection {
    
    private List<Seat> seats;

    public SeatCollection(List<Seat> seats){
        this.seats = seats;
    }

    public SeatIterator createIterator(){
        return new AvailableSeatIterator(seats);
    }
}
