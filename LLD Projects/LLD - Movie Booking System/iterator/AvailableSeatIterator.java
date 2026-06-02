package iterator;

import model.Seat;
import java.util.*;

public class AvailableSeatIterator implements SeatIterator{
    
    private List<Seat> seats;
    private int index = 0;

    public AvailableSeatIterator(List<Seat> seats){
        this.seats = seats;
    }

    @Override
    public boolean hasNext(){
        while(index < seats.size() && seats.get(index).isBooked()){
            index++;
        }
        return index < seats.size();
    }

    @Override
    public Seat next(){
        return seats.get(index++);
    }
}
