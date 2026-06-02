package decorator;

public class EVChargingDecorator extends BillDecorator{
    
    public EVChargingDecorator(BillComponent bill){
        super(bill);
    }

    @Override
    public double getCost(){
        return bill.getCost() + 50;
    }

    @Override
    public String getDescription(){
        return bill.getDescription() + " + EV Charging";
    }
}
