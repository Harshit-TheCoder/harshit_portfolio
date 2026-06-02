package mediator;

public class Collaborator extends EditorUser{

    public Collaborator(CollaborationMediator mediator, String name){
        super(mediator, name);
    }

    @Override
    public void send(String message){
        System.out.println(name + " Sent : " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void recieve(String message) {
        System.out.println(name + " Received : " + message);
    }
}
