package chaos.tech.iotcamera.iot_model;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

import chaos.tech.iotcamera.R;

/**
 * Created by long.tx.ctv on 3/23/2018.
 */


public class DetailAdapter extends RecyclerView.Adapter<DetailAdapter.ViewHolder> {
    private List<DetailORM> detailORM;

    public DetailAdapter(List<DetailORM> detailORMList) {
        this.detailORM = detailORMList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_detail, parent, false);
        return new ViewHolder(itemView, this);    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.detailIconView.setImageResource(detailORM.get(position).getIconRes());
        holder.detailKey.setText(detailORM.get(position).getKey());
        holder.detailTextView.setText(detailORM.get(position).getValue());
    }

    @Override
    public int getItemCount() {
        return detailORM.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public TextView detailTextView;
        TextView detailKey;
        ImageView detailIconView;
        public ViewHolder(View view, DetailAdapter detailAdapter) {
            super(view);
            detailTextView = (TextView) view.findViewById(R.id.detail_txt);
            detailIconView = (ImageView) view.findViewById(R.id.detail_icon);
            detailKey = view.findViewById(R.id.detail_key);
        }
    }

}