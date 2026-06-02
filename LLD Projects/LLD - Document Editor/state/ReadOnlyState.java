package state;

public class ReadOnlyState implements DocumentState {

    @Override
    public void handle() {
        System.out.println("Document Is Read Only");
    }
}