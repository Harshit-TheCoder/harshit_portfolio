package adapter;

import model.Document;

public class WordExporterAdapter implements DocumentExporter{

    private MicrosoftWordSdk microsoftWordSdk;

    public WordExporterAdapter(){
        microsoftWordSdk = new MicrosoftWordSdk();
    }

    @Override
    public void export(Document document){
        microsoftWordSdk.createWordFile(document);
    }

}