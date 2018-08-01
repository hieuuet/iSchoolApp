package chaos.tech.iotcamera.iot_model;

/**
 * Created by long.tx.ctv on 4/12/2018.
 */

public class CameraModel {
    String name;
    String url;
    String roomId;

    public CameraModel( String name, String url, String roomId) {
        this.name = name;

        this.url = url;
        this.roomId= roomId;
    }
    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }
    public String getRoomId() {
        return roomId;
    }
}
