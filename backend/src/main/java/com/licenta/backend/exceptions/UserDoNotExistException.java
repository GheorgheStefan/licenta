package com.licenta.backend.exceptions;

public class UserDoNotExistException extends RuntimeException{
    public UserDoNotExistException(String message) {
        super(message);
    }
}
