package abstractfactory;

import model.*;

public class GoogleDocsFactory implements DocumentFactory{
    
    @Override
    public DocumentElement createParagraph(){
        return new Paragraph("Google Docs Paragraph");
    }

    @Override
    public DocumentElement createTable() {
        return new TableElement(2, 2);
    }

    @Override
    public DocumentElement createImage() {
        return new ImageElement("google_image.png");
    }
}
