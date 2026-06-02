package nullobject;

public class GuestUser implements UserInterface {

    @Override
    public int getId() {
        return -1;
    }

    @Override
    public String getName() {
        return "Guest User";
    }

    @Override
    public boolean isGuest() {
        return true;
    }
}