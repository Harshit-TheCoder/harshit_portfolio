package nullobject;

public class RealUser implements UserInterface{
    
    private int id;
    private String name;

    public RealUser(int id, String name){
        this.id = id;
        this.name = name;
    }

    @Override
    public int getId(){
        return id;
    }

    @Override
    public String getName(){
        return name;
    }

    @Override
    public boolean isGuest(){
        return false;
    }
}
