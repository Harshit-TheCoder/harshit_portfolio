package mediator;

public abstract class EditorUser {

    protected CollaborationMediator mediator;
    protected String name;

    public EditorUser(CollaborationMediator mediator, String name){
        this.mediator = mediator;
        this.name = name;
    }

    public abstract void send(String message);
    public abstract void recieve(String message);
    public String getName(){
        return name;
    }
}
