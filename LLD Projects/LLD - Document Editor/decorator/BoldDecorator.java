package decorator;

public class BoldDecorator extends TextDecorator{
    
    public BoldDecorator(TextComponent component){
        super(component);
    }

    @Override
    public String render(){
        return "<b>" + component.render() + "</b>";
    }
}
