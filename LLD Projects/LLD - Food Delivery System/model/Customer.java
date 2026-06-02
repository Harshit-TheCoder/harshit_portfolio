package model;

public class Customer extends User{

    private String address;

    public Customer(int id, String name, String address){
        super(id, name);
        this.address = address;
    }

    public String getAddress(){
        return address;
    }
}
