package model;

public class Booking {
    
    private int bookingId;
    private User user;
    private Movie movie;
    private Seat seat;
    private BookingStatus status;
    
    public Booking(int bookingId, User user, Movie movie, Seat seat){
        this.bookingId = bookingId;
        this.user = user;
        this.movie = movie;
        this.seat = seat;
        this.status = BookingStatus.CREATED;
    }

    public int getBookingId(){
        return bookingId;
    }

    public User getUser(){
        return user;
    }

    public Movie getMovie(){
        return movie;
    }

    public Seat getSeat(){
        return seat;
    }

    public BookingStatus getStatus(){
        return status;
    }

    public void setStatus(BookingStatus status){
        this.status = status;
    }


}
