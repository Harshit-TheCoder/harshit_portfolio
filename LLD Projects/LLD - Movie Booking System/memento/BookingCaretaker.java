package memento;

import java.util.Stack;

public class BookingCaretaker {

    private Stack<BookingMemento> history = new Stack<>();

    public void save(BookingMemento memento) {
        history.push(memento);
    }

    public BookingMemento undo() {
        return history.pop();
    }
}