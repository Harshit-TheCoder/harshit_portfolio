package model;

import java.util.*;

public class Theatre{

    private int theatreId;
    private String theatreName;
    private List<Screen> screens;

    public Theatre(int theatreId, String theatreName, List<Screen> screens){
        this.theatreId = theatreId;
        this.theatreName = theatreName;
        this.screens = screens;
    }

    public int getTheatreId(){
        return theatreId;
    }

    public String getTheatreName(){
        return theatreName;
    }

    public List<Screen> getScreens(){
        return screens;
    }
}