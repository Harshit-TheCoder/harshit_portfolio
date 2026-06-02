package state;

import model.ParkingSpot;

public class AvailableState implements SpotState{
    
    @Override
    public void park(ParkingSpot spot){
        System.out.println("Vehicle Parked");
        spot.setState(new OccupiedState());
    }

    @Override
    public void leave(ParkingSpot spot){
        System.out.println("Already Empty");
    }
}
