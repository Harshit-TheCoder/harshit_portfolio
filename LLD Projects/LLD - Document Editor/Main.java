import abstractfactory.DocumentFactory;
import abstractfactory.GoogleDocsFactory;
import abstractfactory.MicrosoftWordFactory;
import adapter.DocumentExporter;
import adapter.PdfExporterAdapter;
import adapter.WordExporterAdapter;
import bridge.DocumentBridge;
import bridge.LinuxRenderer;
import bridge.PdfDocument;
import bridge.WindowsRenderer;
import bridge.WordDocument;
import chain.GrammarCheckHandler;
import chain.ProfanityCheckHandler;
import chain.SpellCheckHandler;
import chain.ValidationHandler;
import decorator.BoldDecorator;
import decorator.ItalicDecorator;
import decorator.PlainText;
import decorator.TextComponent;
import decorator.UnderlineDecorator;
import flyweight.FontFactory;
import flyweight.FontStyle;
import flyweight.TextCharacter;
import mediator.Collaborator;
import mediator.EditorUser;
import mediator.GoogleDocsMediator;
import model.*;
import repository.DocumentRepository;
import state.DocumentContext;
import state.EditingState;
import state.ReadOnlyState;
import state.ReviewState;
import bridge.Renderer;

public class Main {

    public static void main(String[] args) {

        Document document = new Document(1, "Design Patterns Notes");
        document.addElement(new Paragraph("Factory Pattern"));
        document.addElement(new Paragraph("Strategy Pattern"));
        document.addElement(new ImageElement("uml_diagram.png"));
        document.addElement(new TableElement(3, 4));
        DocumentRepository repository = new DocumentRepository();
        repository.save(document);
        Document fetched = repository.findById(1);
        fetched.display();
        Paragraph paragraph = new Paragraph("Prototype Pattern Notes");
        DocumentElement copiedParagraph = paragraph.clone();
        copiedParagraph.display();

        FontStyle style1 = FontFactory.getFont("Arial", 12, true);
        FontStyle style2 = FontFactory.getFont("Arial", 12, true);
        FontStyle style3 = FontFactory.getFont("Times", 14, false);
        TextCharacter c1 = new TextCharacter('H', style1);
        TextCharacter c2 = new TextCharacter('e', style2);
        TextCharacter c3 = new TextCharacter('y', style3);
        c1.display();
        c2.display();
        c3.display();

        System.out.println(style1 == style2);
        System.out.println("Fonts Created : " + FontFactory.totalFontsCreated());

        // Document document = new Document(1, "LLD Notes");

        DocumentExporter pdfExporter = new PdfExporterAdapter();
        pdfExporter.export(document);
        DocumentExporter wordExporter = new WordExporterAdapter();
        wordExporter.export(document);


        Renderer windowsRenderer = new WindowsRenderer();
        Renderer linuxRenderer = new LinuxRenderer();
        DocumentBridge pdf = new PdfDocument(windowsRenderer, "Design Patterns");
        DocumentBridge word = new WordDocument(linuxRenderer, "System Design");
        pdf.display();
        word.display();


        GoogleDocsMediator mediator = new GoogleDocsMediator();
        EditorUser harshit = new Collaborator(mediator, "Harshit");
        EditorUser rahul = new Collaborator(mediator, "Rahul");
        EditorUser aman = new Collaborator(mediator, "Aman");

        mediator.addUser(harshit);
        mediator.addUser(rahul);
        mediator.addUser(aman);
        harshit.send("Added Visitor Pattern Notes");

        TextComponent text = new PlainText("Design Patterns");
        text = new BoldDecorator(text);
        text = new ItalicDecorator(text);
        text = new UnderlineDecorator(text);
        System.out.println(text.render());

        DocumentContext context = new DocumentContext();
        context.setState(new EditingState());
        context.performAction();
        context.setState(new ReviewState());
        context.performAction();
        context.setState(new ReadOnlyState());
        context.performAction();

        ValidationHandler spell = new SpellCheckHandler();
        ValidationHandler grammar = new GrammarCheckHandler();
        ValidationHandler profanity = new ProfanityCheckHandler();
        spell.setNext(grammar);
        grammar.setNext(profanity);
        spell.validate("Hello World");

        // DocumentFactory googleFactory = new GoogleDocsFactory();
        // DocumentElement paragraph = googleFactory.createParagraph();
        // paragraph.display();
        // DocumentFactory wordFactory = new MicrosoftWordFactory();
        // DocumentElement image = wordFactory.createImage();
        // image.display();
    }
}