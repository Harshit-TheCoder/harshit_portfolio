package observer;

public interface ParkingSubject {
    void addObserver(ParkingObserver observer);
    void removeObserver(ParkingObserver observer);
    void notifyObservers(String message);
}
