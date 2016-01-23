package me.hackuoft.android.sms;
// CloudMine library imports
import com.cloudmine.api.CMApiCredentials;
import com.cloudmine.api.CMObject;
import com.cloudmine.api.rest.callbacks.CMObjectResponseCallback;
import com.cloudmine.api.rest.callbacks.ObjectModificationResponseCallback;
import com.cloudmine.api.db.LocallySavableCMObject;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;
import com.cloudmine.api.rest.response.CMObjectResponse;
import com.cloudmine.api.rest.response.ObjectModificationResponse;

/**
 * Created by Guelor on 2016-01-23.
 */
public class User extends LocallySavableCMObject {
    public static final String CLASS_NAME = "User";
    private String name;
    private String phoneNumber;
    private String email;

    // A no-args constructor is required for deserialization
    public User() {
        super();
    }
    public User(String name, String pNumber, String email) {
        this();
        this.name        = name;
        this.phoneNumber = pNumber;
        this.email       = email;
    }

    // This changes the __class__ naming scheme, for interoperability
    // with existing data from another platform such as iOS
    @Override
    public String getClassName() {
        return CLASS_NAME;
    }

    // Getters and Setters are required for each serialized field
    public String getName() {
        return name;
    }
    public String getPNumber(){
        return phoneNumber;
    }
    public String getEmail(){
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setPNumber(String number){phoneNumber = number;}
    public void setEmail(String email){ this.email = email;}

}
