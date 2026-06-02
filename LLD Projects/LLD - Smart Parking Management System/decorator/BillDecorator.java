package decorator;

public abstract class BillDecorator implements BillComponent{
    protected BillComponent bill;
    public BillDecorator(BillComponent bill){
        this.bill = bill;
    }
}
