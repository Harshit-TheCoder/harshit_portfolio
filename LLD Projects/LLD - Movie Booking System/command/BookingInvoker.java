package command;

public class BookingInvoker {
    
    public void executeCommand(Command command){
        command.execute();
    }
}
