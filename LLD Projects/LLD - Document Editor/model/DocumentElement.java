package model;

import visitor.DocumentVisitor;

public abstract class DocumentElement implements Cloneable{
    public abstract void display();
    public abstract DocumentElement clone();
    public abstract void accept(DocumentVisitor visitor);
}