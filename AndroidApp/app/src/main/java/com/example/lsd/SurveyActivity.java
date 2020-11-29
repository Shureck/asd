package com.example.lsd;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ListView;
import android.widget.RadioGroup;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class SurveyActivity extends AppCompatActivity {

    ArrayList<Product> products = new ArrayList();
    RecyclerView recyclerView;
    FloatingActionButton floatingActionButton;
    private static OkHttpClient client = new OkHttpClient();
    static String str;
    public int[] arr = {-2,-2,-2,-2,-2,-2};

    static class IOAsyncTask extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            return sendData(params[0]);
        }

        @Override
        protected void onPostExecute(String response) {
            str = response;
            Log.d("DDD",response);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey);

        floatingActionButton = findViewById(R.id.floatingActionButton);

        if(products.size()==0){
            products.add(new Product("Помогает ли Вам бесплатный общественный Wi-Fi?"));
            products.add(new Product("Упростил ли каршеринг Ваше передвижение по городу?"));
            products.add(new Product("Упрощают ли городские онлайн-сервисы ведение бизнеса?"));
            products.add(new Product("Упростила ли процесс получения медпомощи онлайн-запись к врачу?"));
            products.add(new Product("Онлайн-расписание транспорта упростило пользование им?"));
            products.add(new Product("Повышают ли дорожные камеры безопасность дорожного движения?"));
        }
        recyclerView = (RecyclerView) findViewById(R.id.res);
        ResAdapter adapter = new ResAdapter(this, products);
        recyclerView.setAdapter(adapter);

        StringBuilder stringBuilder = new StringBuilder();

        floatingActionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RadioGroup r = recyclerView.findViewHolderForItemId(adapter.getItemId(4)).itemView.findViewById(R.id.r_group);
                System.out.println(r.getCheckedRadioButtonId());
            }
        });
    }

    public static String sendData(String str){
        ObjectMapper om = new ObjectMapper();
        try {
            ObjectNode on = om.createObjectNode();
            on.put("query", str);
            on.put("variables", om.createObjectNode());

            Log.d("writeValueAsBytes", om.writeValueAsString(on));

            Request request = new Request.Builder()
                    .url("http://192.168.31.187:5000/graphql")
                    .post(RequestBody.create(om.writeValueAsBytes(on), MediaType.parse("application/json; charset=utf-8")))
                    .build();

            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            return "Error: " + e.getMessage();
        }
    }
}