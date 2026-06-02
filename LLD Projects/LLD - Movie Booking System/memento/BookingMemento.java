package memento;

import model.BookingStatus;

public class BookingMemento {

    private BookingStatus status;

    public BookingMemento(BookingStatus status){
        this.status = status;
    }

    public BookingStatus getStatus(){
        return status;
    }
}
