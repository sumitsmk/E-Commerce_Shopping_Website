package com.sunbeaminfo.CustomExceptions;

public class ResourceNotFound extends RuntimeException{
    String resourceName;
    String fieldName;
    long fieldValue;
    String str;

    public ResourceNotFound(String resourceName, String fieldName, long fieldValue) {
        super(resourceName+" not found with "+fieldName+" : "+fieldValue);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

     public ResourceNotFound(String resourceName, String fieldName, String str) {
        super(resourceName+" not found with "+fieldName+" : "+str);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

     public ResourceNotFound(String resourceName, String fieldName) {
        super(resourceName+" already exists!! "+fieldName);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
    }

    
}
