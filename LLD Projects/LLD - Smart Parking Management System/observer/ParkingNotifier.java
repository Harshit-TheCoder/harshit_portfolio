package observer;

import java.util.*;

public class ParkingNotifier implements ParkingSubject{
    
    private List<ParkingObserver> observers = new ArrayList<>();

    @Override
    public void addObserver(ParkingObserver observer){
        observers.add(observer);
    }

    @Override
    public void removeObserver(ParkingObserver observer){
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String message){
        for(ParkingObserver observer: observers){
            observer.update(message);
        }
    }
}
