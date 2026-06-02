package model;

import java.util.*;

public class Screen{

    private int screenId;
    private List<Seat> seats;

    public Screen(int screenId, List<Seat> seats){
        this.screenId = screenId;
        this.seats = seats;
    }

    public int getScreenId(){
        return screenId;
    }

    public List<Seat> getSeats(){
        return seats;
    }
}