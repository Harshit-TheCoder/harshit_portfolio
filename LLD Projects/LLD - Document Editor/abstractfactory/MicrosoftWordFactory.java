package abstractfactory;

import model.*;

public class MicrosoftWordFactory implements DocumentFactory {

    @Override
    public DocumentElement createParagraph() {
        return new Paragraph("MS Word Paragraph");
    }

    @Override
    public DocumentElement createTable() {
        return new TableElement(3, 3);
    }

    @Override
    public DocumentElement createImage() {
        return new ImageElement("word_image.png");
    }
}