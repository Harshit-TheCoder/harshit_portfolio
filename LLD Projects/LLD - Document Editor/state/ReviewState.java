package state;

public class ReviewState implements DocumentState {

    @Override
    public void handle() {
        System.out.println("Document In Review Mode");
    }
}