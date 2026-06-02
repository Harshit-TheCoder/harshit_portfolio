package visitor;

import model.Paragraph;
import model.ImageElement;
import model.TableElement;

public interface DocumentVisitor {

    void visit(Paragraph paragraph);
    void visit(ImageElement image);
    void visit(TableElement table);
}
