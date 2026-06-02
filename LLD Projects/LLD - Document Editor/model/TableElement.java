package model;

import visitor.DocumentVisitor;

public class TableElement extends DocumentElement{
    private int rows;
    private int columns;
    public TableElement(int rows, int columns){
        this.rows = rows;
        this.columns = columns;
    }
    @Override
    public void display(){
        System.out.println("Table : " + rows + "x" + columns);
    }

    @Override
    public DocumentElement clone(){
        return new TableElement(rows, columns);
    }

    @Override
    public void accept(DocumentVisitor visitor){
        visitor.visit(this);
    }
}
