package model;

import visitor.DocumentVisitor;
public class ImageElement extends DocumentElement{
    private String imageName;
    public ImageElement(String imageName){
        this.imageName = imageName;
    }

    public String getImageName(){
        return imageName;
    }

    @Override
    public void display(){
        System.out.println("Image: " + imageName);
    }

    @Override
    public DocumentElement clone(){
        return new ImageElement(imageName);
    }

    @Override
    public void accept(DocumentVisitor visitor){
        visitor.visit(this);
    }
}