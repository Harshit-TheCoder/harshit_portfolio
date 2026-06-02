package chain;

public class SpellCheckHandler extends ValidationHandler{
    
    @Override
    public void validate(String content){
        System.out.println("Spell Check Passed");
        if(next != null) next.validate(content);
    }
}
