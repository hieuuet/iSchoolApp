package chaos.tech.iotcamera.iot_model;

import android.support.v7.widget.RecyclerView;
import android.view.View;

import butterknife.ButterKnife;

/**
 * Created by long.tx.ctv on 3/23/2018.
 */

public abstract class BaseViewHolder extends RecyclerView.ViewHolder {

    public BaseViewHolder(View itemView){
        super(itemView);
        ButterKnife.bind(this,itemView);
    }


}