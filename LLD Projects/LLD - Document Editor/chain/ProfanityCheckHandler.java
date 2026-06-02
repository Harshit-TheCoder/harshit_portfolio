package chain;

public class ProfanityCheckHandler extends ValidationHandler {

    @Override
    public void validate(String content) {

        System.out.println("Profanity Check Passed");

        if(next != null)
            next.validate(content);
    }
}