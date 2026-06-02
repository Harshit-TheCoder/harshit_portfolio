package adapter;

import model.Document;

public class AdobePdfSdk {
    public void generatePDF(Document document){
        System.out.println("Adobe PDF Generated : " + document.getTitle());
    }
}
