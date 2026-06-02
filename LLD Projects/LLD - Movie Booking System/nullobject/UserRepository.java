package nullobject;

import java.util.*;

public class UserRepository {

    private Map<Integer, UserInterface> users= new HashMap<>();

    public UserRepository(){
        users.put(1, new RealUser(1, "Harshit"));
        users.put(2, new RealUser(2, "Rahul"));
    }

    public UserInterface findUser(int id) {
        return users.getOrDefault(id, new GuestUser());
    }
}
