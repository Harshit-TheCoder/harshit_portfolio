package model;

import visitor.DocumentVisitor;
public class Paragraph extends DocumentElement{

    private String text;

    public Paragraph(String text){
        this.text = text;
    }

    public String getText(){
        return text;
    }

    @Override
    public void display(){
        System.out.println("Paragraph: " + text );
    }
    
    @Override
    public DocumentElement clone(){
        return new Paragraph(text);
    }

    @Override
    public void accept(DocumentVisitor visitor){
        visitor.visit(this);
    }
}