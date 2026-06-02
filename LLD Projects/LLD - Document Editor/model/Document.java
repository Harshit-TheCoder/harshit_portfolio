package model;

import java.util.*;

import visitor.DocumentVisitor;

public class Document{

    private int id;
    private String title;
    private List<DocumentElement> elements;

    public Document(int id, String title){
        this.id = id;
        this.title = title;
        this.elements = new ArrayList<>();
    }

    public int getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public void addElement(DocumentElement element){
        elements.add(element);
    }

    public List<DocumentElement> getElements(){
        return elements;
    }

    public void display() {

        System.out.println("Document : " + title);

        for(DocumentElement element : elements)
            element.display();
    }

    public void accept(DocumentVisitor visitor) {

        for(DocumentElement element : elements)
            element.accept(visitor);
    }
}