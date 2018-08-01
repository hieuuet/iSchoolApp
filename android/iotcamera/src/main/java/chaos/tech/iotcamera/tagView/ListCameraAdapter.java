package chaos.tech.iotcamera.tagView;

import android.annotation.SuppressLint;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import chaos.tech.iotcamera.R;
import chaos.tech.iotcamera.iot_model.CameraModel;

/**
 * Created by long.tx.ctv on 3/19/2018.
 */

public class ListCameraAdapter extends RecyclerView.Adapter<ListCameraAdapter.MyViewHolder>  {
    private List<CameraModel> horizontalList;
    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView txtView;
        public String urlCamera;

        public MyViewHolder(View view) {
            super(view);
            txtView = (TextView) view.findViewById(R.id.txtView);

        }
    }
    public ListCameraAdapter(List<CameraModel> horizontalList) {
        this.horizontalList = horizontalList;
    }
    private final ArrayList<Integer> seleccionados = new ArrayList<>();
    int row_index=0;
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.horizontal_item_view, parent, false);
//        itemView.setBackground();
        if (viewType==0){

        }
            return new MyViewHolder(itemView);
    }
    @Override
    public int getItemViewType(int position) {
        if (position == 0) return 1;
        else return 2;
    }
    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {

        holder.txtView.setText(horizontalList.get(position).getName());
        holder.txtView.setOnClickListener(new View.OnClickListener() {
            @SuppressLint("ResourceAsColor")
            @Override
            public void onClick(View v) {
                row_index=position;
            }
        });
    }

    @Override
    public int getItemCount() {
        return horizontalList.size();
    }
}
