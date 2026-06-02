package composite;

import java.util.*;

public class ScreenComposite extends TheatreComponent{
    
    private int screenId;
    private List<TheatreComponent> children = new ArrayList<>();

    public ScreenComposite(int screenId){
        this.screenId = screenId;
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
        System.out.println("Screen : " + screenId);
        for(TheatreComponent component: children){
            component.display();
        }
    }
}
