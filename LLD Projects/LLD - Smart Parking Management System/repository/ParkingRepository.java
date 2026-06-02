package repository;

import model.ParkingSpot;
import java.util.*;

public class ParkingRepository {
    private static ParkingRepository instance;
    private List<ParkingSpot> spots;
    private ParkingRepository(){
        spots = new ArrayList<>();
    }
    public static ParkingRepository getInstance(){
        if(instance == null){
            instance = new ParkingRepository();
        }
        return instance;
    }
    public List<ParkingSpot> getSpots(){
        return spots;
    }
}
