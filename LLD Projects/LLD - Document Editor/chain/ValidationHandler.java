package chain;

public abstract class ValidationHandler {
    
    protected ValidationHandler next;

    public void setNext(ValidationHandler next){
        this.next = next;
    }

    public abstract void validate(String content);
}
