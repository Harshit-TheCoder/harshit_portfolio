package bridge;

public class LinuxRenderer implements Renderer {

    @Override
    public void render(String content) {
        System.out.println("Rendering On Linux : " + content);
    }
}