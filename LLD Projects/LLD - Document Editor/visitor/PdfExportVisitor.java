package visitor;

import model.*;

public class PdfExportVisitor implements DocumentVisitor {

    @Override
    public void visit(Paragraph paragraph) {
        System.out.println("Exporting Paragraph To PDF : " + paragraph.getText());
    }

    @Override
    public void visit(ImageElement image) {
        System.out.println("Exporting Image To PDF : " + image.getImageName());
    }

    @Override
    public void visit(TableElement table) {
        System.out.println("Exporting Table To PDF");
    }
}