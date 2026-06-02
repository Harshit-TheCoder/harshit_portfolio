package model;

import state.AvailableState;
import state.SpotState;

public class ParkingSpot{

    private int spotId;
    private boolean occupied;
    private SpotState state;

    public ParkingSpot(int spotId){
        this.spotId = spotId;
        this.occupied = false;
        state = new AvailableState();
    }

    public int getSpotId(){
        return spotId;
    }
    public boolean isOccupied(){
        return occupied;
    }
    public void occupy(){
        occupied = true;
    }
    public void free(){
        occupied = false;
    }

    public void park() {
        state.park(this);
    }
    public void leave() {
        state.leave(this);
    }
    public void setState(SpotState state) {
        this.state = state;
    }

}