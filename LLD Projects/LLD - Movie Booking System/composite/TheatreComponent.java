package composite;

public abstract class TheatreComponent {
    
    public void add(TheatreComponent component){
        throw new UnsupportedOperationException();
    }

    public void remove(TheatreComponent component){
        throw new UnsupportedOperationException();
    }
    public abstract void display();
}
