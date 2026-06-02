package state;

public class DocumentContext {
    
    private DocumentState state;
    public void setState(DocumentState state){
        this.state = state;
    }

    public void performAction(){
        state.handle();
    }
}
