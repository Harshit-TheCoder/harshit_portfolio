package repository;

import model.Document;
import java.util.*;

public class DocumentRepository {
    
    private Map<Integer, Document> documents;

    public DocumentRepository(){
        documents = new HashMap<>();
    }

    public void save(Document document){
        documents.put(document.getId(), document);
    }

    public Document findById(int id){
        return documents.get(id);
    }

}
