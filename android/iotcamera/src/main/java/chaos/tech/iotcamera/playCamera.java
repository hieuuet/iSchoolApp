package chaos.tech.iotcamera;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
/**
 * Created by long.tx.ctv on 3/21/2018.
 */

public class playCamera extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public playCamera(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PlayCamera";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Intent intent = new Intent(getCurrentActivity(), cameraShow.class);
        String urlDefault = null;
        String roomID_Default = null;
        try {
            JSONArray jsonObj = new JSONArray(message);
//          JSONArray contacts = jsonObj.getJSONArray("contacts");
            JSONObject url = jsonObj.getJSONObject(0);
            urlDefault = url.getString("public_url");
            roomID_Default = url.getString("room_id");
            Log.d("string url",urlDefault);
        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(getReactApplicationContext(),"Không có thông tin camera. ",Toast.LENGTH_LONG).show();
        }
        if (urlDefault!=null){
            intent.putExtra("videoPath", urlDefault);
            intent.putExtra("title", "RTSp Camera");
            intent.putExtra("room_default",roomID_Default);
            intent.putExtra("camera_list",message);
            getCurrentActivity().startActivity(intent);
        }

//        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}
