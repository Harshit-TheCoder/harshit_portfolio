package decorator;

public class UnderlineDecorator extends TextDecorator {

    public UnderlineDecorator(TextComponent component) {
        super(component);
    }

    @Override
    public String render() {
        return "<u>" + component.render() + "</u>";
    }
}