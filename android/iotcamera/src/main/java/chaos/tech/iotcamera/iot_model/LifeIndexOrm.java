package chaos.tech.iotcamera.iot_model;

/**
 * Created by long.tx.ctv on 3/23/2018.
 */

public class LifeIndexOrm {

    private String con_brif;
    private String con_txt;
    private int iconRes;

    public LifeIndexOrm(String bfir,String txt,int icon){
        con_brif=bfir;
        con_txt=txt;
        iconRes=icon;
    }

    public String getCon_brif(){
        return con_brif;
    }

    public String getCon_txt(){
        return con_txt;
    }

    public int getIconRes(){
        return iconRes;
    }
}
