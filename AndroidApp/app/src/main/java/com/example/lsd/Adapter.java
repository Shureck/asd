package com.example.lsd;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.lsd.Product;
import com.example.lsd.R;

import java.util.ArrayList;

class Adapter extends ArrayAdapter<Product> {
    private LayoutInflater inflater;
    private int layout;
    private ArrayList<Product> productList;

    Adapter(Context context, int resource, ArrayList<Product> products) {
        super(context, resource, products);
        this.productList = products;
        this.layout = resource;
        this.inflater = LayoutInflater.from(context);
    }
    public View getView(int position, View convertView, ViewGroup parent) {

        final ViewHolder viewHolder;
        if(convertView==null){
            convertView = inflater.inflate(this.layout, parent, false);
            viewHolder = new ViewHolder(convertView);
            convertView.setTag(viewHolder);
        }
        else{
            viewHolder = (ViewHolder) convertView.getTag();
        }
        final Product product = productList.get(position);

        viewHolder.nameView.setText(product.getAsk());

        viewHolder.r_group.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch (checkedId) {
                    case -1:
                        break;
                    case R.id.radioButton1:
                        System.out.println("Я первый");
                        break;
                    case R.id.radioBtn2:
                        System.out.println("Я второй");
                        break;
                    case R.id.radioBtn3:
                        System.out.println("Я третий");
                        break;

                    default:
                        break;
                }
            }
        });

        return convertView;
    }

    private String formatValue(int count, String unit){
        return String.valueOf(count) + " " + unit;
    }

    private class ViewHolder {
        final TextView nameView;
        final RadioGroup r_group;
        ViewHolder(View view){
            nameView = (TextView) view.findViewById(R.id.textView);
            r_group = (RadioGroup) view.findViewById(R.id.r_group);
        }
    }
}