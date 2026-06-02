package observer;

public class CustomNotification implements OrderObserver{
    
    @Override
    public void update(String message){
        System.out.println("Customer Notification : " + message);
    }
}
