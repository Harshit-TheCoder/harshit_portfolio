package state;

import model.ParkingSpot;

public interface SpotState {

    void park(ParkingSpot spot);
    void leave(ParkingSpot spot);
}
