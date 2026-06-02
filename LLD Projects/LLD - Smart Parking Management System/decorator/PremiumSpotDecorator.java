package decorator;

public class PremiumSpotDecorator extends BillDecorator {

    public PremiumSpotDecorator(BillComponent bill) {
        super(bill);
    }

    @Override
    public double getCost() {
        return bill.getCost() + 30;
    }

    @Override
    public String getDescription() {
        return bill.getDescription() + " + Premium Spot";
    }
}