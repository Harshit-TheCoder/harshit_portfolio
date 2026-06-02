package bridge;

public class WordDocument extends DocumentBridge {
    
    private String content;

    public WordDocument(Renderer renderer, String content){
        super(renderer);
        this.content = content;
    }

    @Override
    public void display(){
        renderer.render("WORD: " + content);
    }
}
