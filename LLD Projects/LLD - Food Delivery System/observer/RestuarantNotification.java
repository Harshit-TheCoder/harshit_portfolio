package observer;

public class RestuarantNotification implements OrderObserver{
    
    @Override
    public void update(String message){
        System.out.println("Restaurant Notification" + message);
    }
}
