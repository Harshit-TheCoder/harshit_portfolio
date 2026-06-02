package mediator;

import java.util.*;

public class GoogleDocsMediator implements CollaborationMediator{
    
    private List<EditorUser> users = new ArrayList<>();

    @Override
    public void addUser(EditorUser user){
        users.add(user);
    }

    @Override
    public void sendMessage(String message, EditorUser sender){
        for(EditorUser user: users){
            if(user != sender){
                user.recieve(message);
            }
        }
    }
    
}
