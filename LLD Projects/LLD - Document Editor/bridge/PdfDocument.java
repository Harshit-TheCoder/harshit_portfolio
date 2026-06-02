package bridge;

public class PdfDocument extends DocumentBridge{

    private String content;

    public PdfDocument(Renderer renderer, String content){
        super(renderer);
        this.content = content;
    }

    @Override
    public void display(){
        renderer.render("PDF: " + content);
    }
}