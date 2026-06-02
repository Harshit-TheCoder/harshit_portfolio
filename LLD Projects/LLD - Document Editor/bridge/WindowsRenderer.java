package bridge;

public class WindowsRenderer implements Renderer {

    @Override
    public void render(String content) {
        System.out.println("Rendering On Windows : " + content);
    }
}