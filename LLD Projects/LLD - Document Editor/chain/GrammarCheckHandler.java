package chain;

public class GrammarCheckHandler extends ValidationHandler {

    @Override
    public void validate(String content) {

        System.out.println("Grammar Check Passed");

        if(next != null)
            next.validate(content);
    }
}