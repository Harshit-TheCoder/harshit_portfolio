package visitor;

import model.*;

public class WordCountVisitor implements DocumentVisitor {

    private int totalWords = 0;

    @Override
    public void visit(Paragraph paragraph) {
        totalWords += paragraph.getText().split("\\s+").length;
    }

    @Override
    public void visit(ImageElement image) {
    }

    @Override
    public void visit(TableElement table) {
    }

    public int getTotalWords() {
        return totalWords;
    }
}