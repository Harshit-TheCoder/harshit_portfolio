package decorator;

public class ItalicDecorator extends TextDecorator {

    public ItalicDecorator(TextComponent component) {
        super(component);
    }

    @Override
    public String render() {
        return "<i>" + component.render() + "</i>";
    }
}