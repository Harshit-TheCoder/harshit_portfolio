package observer;

public class DisplayBoard implements ParkingObserver{
    @Override
    public void update(String message){
        System.out.println("DISPLAY: " + message);
    }
}
