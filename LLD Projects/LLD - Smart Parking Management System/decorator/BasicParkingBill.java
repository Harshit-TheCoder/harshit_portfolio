package decorator;

public class BasicParkingBill implements BillComponent{
    
    @Override
    public double getCost(){
        return 100;
    }

    @Override
    public String getDescription(){
        return "Parking";
    }
}
