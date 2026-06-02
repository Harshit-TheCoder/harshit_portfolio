package composite;

import java.util.*;

public class TheatreComposite extends TheatreComponent{
    
    private String theatreName;
    private List<TheatreComponent> children = new ArrayList<>();

    public TheatreComposite(String theatreName){
        this.theatreName = theatreName;
    }

    @Override
    public void add(TheatreComponent component){
        children.add(component);
    }

    @Override
    public void remove(TheatreComponent component){
        children.remove(component);
    }

    @Override
    public void display(){
        System.out.println("Theatre : " + theatreName);

        for(TheatreComponent component : children) component.display();
    }
}
