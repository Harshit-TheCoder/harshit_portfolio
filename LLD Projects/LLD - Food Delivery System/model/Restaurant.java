package model;

public class Restaurant extends User{

    private String location;

    public Restaurant(int id, String name, String location){
        super(id, name);
        this.location = location;
    }

    public String getLocation(){
        return location;
    }
}
