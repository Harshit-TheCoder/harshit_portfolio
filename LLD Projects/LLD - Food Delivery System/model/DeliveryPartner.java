package model;

public class DeliveryPartner extends User{

    private boolean available;
    private double rating;

    public DeliveryPartner(int id, String name, double rating){
        super(id, name);
        this.available = true;
        this.rating = rating;
    }

    public boolean isAvailable(){
        return available;
    }

    public void setAvailable(boolean available){
        this.available = available;
    }

    public double getRating(){
        return rating;
    }
}