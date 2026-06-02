package adapter;

import model.Document;

public class MicrosoftWordSdk {

    public void createWordFile(Document document) {
        System.out.println("Word File Generated : " + document.getTitle());
    }
}