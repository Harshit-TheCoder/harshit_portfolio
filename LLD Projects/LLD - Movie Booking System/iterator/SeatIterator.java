package iterator;

import model.Seat;

public interface SeatIterator {
    boolean hasNext();
    Seat next();
}
