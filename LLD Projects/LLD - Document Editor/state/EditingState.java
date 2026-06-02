package state;

public class EditingState implements DocumentState{
    
    @Override
    public void handle(){
        System.out.println("Document in Editing Mode");
    }
}
