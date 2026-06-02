package observer;

public class SMSNotification implements ParkingObserver{
    @Override
    public void update(String message){
        System.out.println("SMS: " + message);
    }
}
