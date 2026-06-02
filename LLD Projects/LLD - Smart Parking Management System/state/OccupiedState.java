package state;

import model.ParkingSpot;
public class OccupiedState implements SpotState{
    
    @Override
    public void park(ParkingSpot spot){
        System.out.println("Spot Occupied");
    }

    @Override
    public void leave(ParkingSpot spot){
        System.out.println("Vehicle Left");
        spot.setState(new AvailableState());
    }
}
