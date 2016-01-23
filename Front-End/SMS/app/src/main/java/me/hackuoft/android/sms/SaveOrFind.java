package me.hackuoft.android.sms;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import static android.Manifest.permission.READ_CONTACTS;

/**
 * Created by patrick_wu on 23/01/16.
 */
public class SaveOrFind extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.save_or_find);

        Button saveSeatButton = (Button)findViewById(R.id.save_seat);
        Button findSeatButton = (Button)findViewById(R.id.find_seat);

        saveSeatButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent save = new Intent(SaveOrFind.this, FindSeatActivity.class);
                startActivity(save);
            }
        });

        findSeatButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                Intent find = new Intent(SaveOrFind.this, SaveSeatActivity.class);
                startActivity(find);
            }
        });

    }







}
