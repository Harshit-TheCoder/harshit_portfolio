package abstractfactory;

import model.DocumentElement;

public interface DocumentFactory {
    DocumentElement createParagraph();
    DocumentElement createTable();
    DocumentElement createImage();
}
