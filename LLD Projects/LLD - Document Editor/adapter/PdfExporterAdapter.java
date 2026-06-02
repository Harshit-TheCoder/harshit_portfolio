package adapter;

import model.Document;

public class PdfExporterAdapter implements DocumentExporter{

    private AdobePdfSdk adobePdfSdk;

    public PdfExporterAdapter(){
        adobePdfSdk = new AdobePdfSdk();
    }

    @Override
    public void export(Document document){
        adobePdfSdk.generatePDF(document);
    }
}