package service;

import model.*;
import java.util.*;
import observer.*;

public class ParkingService{

    private List<ParkingSpot> spots;
    private ParkingNotifier notifier;

    public ParkingService(int totalSpots, ParkingNotifier notifier){
        this.notifier = notifier;
        spots = new ArrayList<>();
        for(int i=1;i<=totalSpots;i++){
            spots.add(new ParkingSpot(i));
        }
    }

    public ParkingSpot assignSpot(){

        for(ParkingSpot spot: spots){
            if(!spot.isOccupied()){
                spot.occupy();
                notifier.notifyObservers("Spot " + spot.getSpotId() + " Occupied");
                return spot;
            }
        }
        return null;
    }
}