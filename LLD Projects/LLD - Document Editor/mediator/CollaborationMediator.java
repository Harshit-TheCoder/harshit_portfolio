package mediator;

public interface CollaborationMediator {
    void addUser(EditorUser user);
    void sendMessage(String message, EditorUser sender);    
}
