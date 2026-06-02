package flyweight;

public class FontStyle {
    
    private String fontName;
    private int fontSize;
    private boolean bold;

    public FontStyle(String fontName, int fontSize, boolean bold){
        this.fontName = fontName;
        this.fontSize = fontSize;
        this.bold = bold;
    }

    public String getFontName(){
        return fontName;
    }

    public int getFontSize(){
        return fontSize;
    }

    public boolean isBold(){
        return bold;
    }
}
