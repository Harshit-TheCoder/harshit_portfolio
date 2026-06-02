package bridge;

public abstract class DocumentBridge {
    
    protected Renderer renderer;
    public DocumentBridge(Renderer renderer){
        this.renderer = renderer;
    }

    public abstract void display();
}
