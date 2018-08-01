package chaos.tech.iotcamera.iot_model;

/**
 * Created by long.tx.ctv on 3/23/2018.
 */

public class DetailORM {
    private int mIconRes;
    private String key;
    private String value;

    public DetailORM(int iconRes,String key,String value){
        this.key=key;
        this.value=value;
        mIconRes=iconRes;
    }

    public String getKey(){
        return key;
    }

    public String getValue(){
        return value;
    }

    public int getIconRes(){
        return mIconRes;
    }


}
