package composite;

public class SeatLeaf extends TheatreComponent{
    
    private int seatNumber;
    
    public SeatLeaf(int seatNumber){
        this.seatNumber = seatNumber;
    }

    @Override
    public void display(){
        System.out.println("Seat: " + seatNumber);
    }
}
