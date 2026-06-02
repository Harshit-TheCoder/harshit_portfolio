package observer;

public class EmailNotification implements ParkingObserver{
    @Override
    public void update(String message){
        System.out.println("EMAIL: " + message);
    }
}
