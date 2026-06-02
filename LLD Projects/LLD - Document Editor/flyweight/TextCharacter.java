package flyweight;

public class TextCharacter {
    
    private char character;
    private FontStyle fontStyle;

    public TextCharacter(char character, FontStyle fontStyle){
        this.character = character;
        this.fontStyle = fontStyle;
    }

    public void display() {

        System.out.println(
                character +
                " -> " +
                fontStyle.getFontName() +
                " " +
                fontStyle.getFontSize()
        );
    }
}
