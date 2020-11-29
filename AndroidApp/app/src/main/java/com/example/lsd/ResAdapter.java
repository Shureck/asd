package com.example.lsd;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class ResAdapter extends RecyclerView.Adapter<ResAdapter.ViewHolder> {

    private LayoutInflater inflater;
    private List<Product> phones;

    ResAdapter(Context context, List<Product> products) {
        this.phones = products;
        this.inflater = LayoutInflater.from(context);
    }
    @Override
    public ResAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = inflater.inflate(R.layout.listitem, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ResAdapter.ViewHolder holder, int position) {
        Product product = phones.get(position);
        holder.nameView.setText(product.getAsk());
        holder.radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
        SurveyActivity surveyActivity = new SurveyActivity();
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch (checkedId) {
                    case -1:
                        break;
                    case R.id.radioButton1:
                        System.out.println("Я первый "+position);
                        new SurveyActivity.IOAsyncTask().execute("mutation {" +
                                "createDatum(input: {datum: {" +
                                "c43:"+  1 +"," +
                                "}}) {" +
                                "datum {" +
                                "id" +
                                "}" +
                                "}" +
                                "}");
                        surveyActivity.arr[position] = 1;
                        break;
                    case R.id.radioBtn2:
                        System.out.println("Я второй "+position);
                        new SurveyActivity.IOAsyncTask().execute("mutation {" +
                                "createDatum(input: {datum: {" +
                                "c43:"+  0 +"," +
                                "}}) {" +
                                "datum {" +
                                "id" +
                                "}" +
                                "}" +
                                "}");
                        surveyActivity.arr[position] = 0;
                        break;
                    case R.id.radioBtn3:
                        System.out.println("Я третий "+position);
                        surveyActivity.arr[position] = -1;
                        break;

                    default:
                        break;
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return phones.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        final RadioGroup radioGroup;
        final TextView nameView;
        ViewHolder(View view){
            super(view);
            nameView = (TextView) view.findViewById(R.id.textView);
            radioGroup = (RadioGroup) view.findViewById(R.id.r_group);
        }
    }
}
