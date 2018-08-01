package chaos.tech.iotcamera;

import android.annotation.SuppressLint;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TableLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import chaos.tech.iotcamera.application.Settings;
import chaos.tech.iotcamera.content.RecentMediaStorage;
import chaos.tech.iotcamera.fragments.TracksFragment;
import chaos.tech.iotcamera.iot_model.CameraModel;
import chaos.tech.iotcamera.iot_model.DetailAdapter;
import chaos.tech.iotcamera.iot_model.DetailORM;
import chaos.tech.iotcamera.iot_model.ForecastORM;
import chaos.tech.iotcamera.iot_model.LifeIndexOrm;
import chaos.tech.iotcamera.tagView.ListCameraAdapter;
import chaos.tech.iotcamera.tagView.RecyclerItemClickListener;
import chaos.tech.iotcamera.widget.media.AndroidMediaController;
import chaos.tech.iotcamera.widget.media.IjkVideoView;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import tv.danmaku.ijk.media.player.IjkMediaPlayer;
import tv.danmaku.ijk.media.player.misc.ITrackInfo;

public class cameraShow extends AppCompatActivity implements TracksFragment.ITrackHolder{

    private static final String TAG = "VideoActivity";
    Response response = null;
    private String mVideoPath;
    private String roomDefault;
    private Uri mVideoUri;
    RecyclerView horizontal_recycler_view;
    private AndroidMediaController mMediaController;
    private IjkVideoView mVideoView;
    //    private TextView mToastTextView;
    private TableLayout mHudView;
    private DrawerLayout mDrawerLayout;
    private ViewGroup mRightDrawer;
//  install recyle IOT
    private Settings mSettings;
    private boolean mBackPressed;
    private  ArrayList<CameraModel> cameraModel;
    private ListCameraAdapter horizontalAdapter;
    DetailAdapter detailAdapter;
    private List<DetailORM> detailORMs;
    private List<ForecastORM> forecastORMs;
    private List<LifeIndexOrm> lifeIndexOrms;
    RecyclerView detail_recyclerview;
    LinearLayout llRecyler;
    String cameraList;
    JSONArray cameraArray;
    //    install menu setting
    LinearLayout ic_menu,frameLayout;
    String tokenId;

    public int row_index = 0;
    public static Intent newIntent(Context context, String videoPath, String videoTitle) {
        Intent intent = new Intent(context, cameraShow.class);
        intent.putExtra("videoPath", videoPath);
        intent.putExtra("videoTitle", videoTitle);
        return intent;
    }

    public static void intentTo(Context context, String videoPath, String videoTitle) {
        context.startActivity(newIntent(context, videoPath, videoTitle));
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera_show);
        mVideoPath = getIntent().getStringExtra("videoPath");
        cameraList = getIntent().getStringExtra("camera_list");
        roomDefault = getIntent().getStringExtra("room_default");
        try {
             cameraArray = new JSONArray(cameraList);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSettings = new Settings(this);
//        initSizeData();
        initCameras();
        // create and set data into recycle card view iot
//        initRecycalView();
//      setup and onclick action in menu
        initMenu();

        fetchData(roomDefault);
        Intent intent = getIntent();
        String intentAction = intent.getAction();
        if (!TextUtils.isEmpty(intentAction)) {
            if (intentAction.equals(Intent.ACTION_VIEW)) {
                mVideoPath = intent.getDataString();
            } else if (intentAction.equals(Intent.ACTION_SEND)) {
                mVideoUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.ICE_CREAM_SANDWICH) {
                    String scheme = mVideoUri.getScheme();
                    if (TextUtils.isEmpty(scheme)) {
                        Log.e(TAG, "Null unknown scheme\n");
                        finish();
                        return;
                    }
                    if (scheme.equals(ContentResolver.SCHEME_ANDROID_RESOURCE)) {
                        mVideoPath = mVideoUri.getPath();
                    } else if (scheme.equals(ContentResolver.SCHEME_CONTENT)) {
                        Log.e(TAG, "Can not resolve content below Android-ICS\n");
                        finish();
                        return;
                    } else {
                        Log.e(TAG, "Unknown scheme " + scheme + "\n");
                        finish();
                        return;
                    }
                }
            }

        }
        if (!TextUtils.isEmpty(mVideoPath)) {
            new RecentMediaStorage(this).saveUrlAsync(mVideoPath);
        }
        mMediaController = new AndroidMediaController(this, false);
        mHudView = (TableLayout) findViewById(R.id.hud_view);
        mRightDrawer = (ViewGroup) findViewById(R.id.right_drawer);
        // init player
        IjkMediaPlayer.loadLibrariesOnce(null);
        IjkMediaPlayer.native_profileBegin("libijkplayer.so");

        mVideoView = (IjkVideoView) findViewById(R.id.video_view);
        mVideoView.setMediaController(mMediaController);
        mVideoView.setHudView(mHudView);
        // prefer mVideoPath
        if (mVideoPath != null)
            mVideoView.setVideoPath(mVideoPath);
        else if (mVideoUri != null)
            mVideoView.setVideoURI(mVideoUri);
        else {
            Log.e(TAG, "Null Data Source\n");
            finish();
            return;
        }
        mVideoView.start();
        actionFullVideo();
    }

    @Override
    public void onBackPressed() {
        mBackPressed = true;

        super.onBackPressed();
    }

    @Override
    protected void onStop() {
        super.onStop();

        if (mBackPressed || !mVideoView.isBackgroundPlayEnabled()) {
            mVideoView.stopPlayback();
            mVideoView.release(true);
            mVideoView.stopBackgroundPlay();
        } else {
            mVideoView.enterBackground();
        }
        IjkMediaPlayer.native_profileEnd();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.menu_player, menu);
        return false;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        return false;
    }

    @Override
    public ITrackInfo[] getTrackInfo() {
        if (mVideoView == null)
            return null;
        return mVideoView.getTrackInfo();
    }

    @Override
    public void selectTrack(int stream) {
        mVideoView.selectTrack(stream);
    }

    @Override
    public void deselectTrack(int stream) {
        mVideoView.deselectTrack(stream);
    }

    @Override
    public int getSelectedTrack(int trackType) {
        if (mVideoView == null)
            return -1;

        return mVideoView.getSelectedTrack(trackType);
    }

    private List<DetailORM> createDetail(int humidity,int temp){

        List<DetailORM> details=new ArrayList<>();
        details.add(new DetailORM(R.drawable.ic_temp,"Nhiệt độ",temp +"℃"));
        details.add(new DetailORM(R.drawable.ic_shidu,"Độ ẩm",humidity+"%"));
//        details.add(new DetailORM(R.drawable.ic_pres,"Không khí",art+"Pa"));
        return details;
    }

    void initRecycalView( int temp,int humidity  ){
        detail_recyclerview = findViewById(R.id.detail_recyclerview);
        detail_recyclerview .setNestedScrollingEnabled(false);
        detail_recyclerview.setLayoutManager(new GridLayoutManager(this, 3));
        detailORMs=new ArrayList<>();
        detailAdapter=new DetailAdapter(detailORMs);
        detail_recyclerview.setAdapter(detailAdapter);
        detailAdapter.notifyDataSetChanged();
        detailORMs.addAll(createDetail(humidity,temp));
    }
//

    void initCameras()  {
        horizontal_recycler_view= findViewById(R.id.horizontal_recycler_view);
        llRecyler= findViewById(R.id.llRecyler);
        cameraModel=new ArrayList<>();
        if(cameraArray!=null){
            try {
                tokenId =cameraArray.getJSONObject(0).getString("tokenId");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            for (int i=0;i<cameraArray.length();i++){
                JSONObject c = null;
                try {
                    c = cameraArray.getJSONObject(i);
                    cameraModel.add(new CameraModel(c.getString("name"), c.getString("public_url"), c.getString("room_id")));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        horizontalAdapter=new ListCameraAdapter(cameraModel);
        LinearLayoutManager horizontalLayoutManagaer
                = new LinearLayoutManager(cameraShow.this, LinearLayoutManager.HORIZONTAL, false);
        horizontal_recycler_view.setLayoutManager(horizontalLayoutManagaer);
        horizontal_recycler_view.setAdapter(horizontalAdapter);

        horizontal_recycler_view.addOnItemTouchListener(
                new RecyclerItemClickListener(getApplicationContext(), horizontal_recycler_view, new RecyclerItemClickListener.OnItemClickListener() {
                    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
                    @SuppressLint("ResourceAsColor")
                    @Override
                    public void onItemClick(View view, int position) {
                        for(int i=0;i<cameraModel.size();i++){
                            horizontal_recycler_view.getChildAt(i).setBackground(getDrawable(R.drawable.bg_none));
                        }
                        horizontal_recycler_view.getChildAt(position).setBackground(getDrawable(R.drawable.test));
                        row_index=position;
                        mVideoPath = cameraModel.get(position).getUrl();
                        roomDefault = cameraModel.get(position).getRoomId();
                        // get data iot
                        fetchData(roomDefault);
                        mVideoView.setVideoPath(mVideoPath);
                        mVideoView.start();
                    }
                    @Override
                    public void onLongItemClick(View view, int position) {

                    }
                })
        );
    }
    void initMenu(){

        ic_menu = findViewById(R.id.ic_back);
        ic_menu.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
              finish();
            }
        });
    }
    void actionFullVideo(){
        frameLayout = findViewById(R.id.frameLayout);
        frameLayout.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), fullShowVideo.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.putExtra("videoPath", mVideoPath);
                intent.putExtra("title", "RTSp Camera");
                getApplicationContext().startActivity(intent);
            }
        });

    }

    void fetchData(final String classid){
        AsyncTask asyncTask = new AsyncTask() {
            @Override
            protected Object doInBackground(Object[] objects) {
                OkHttpClient client = new OkHttpClient();
                Request request = new Request.Builder().
                        addHeader("Authorization", "Bearer " + tokenId).
                        addHeader("Content-Type", "application/json").
                        addHeader("Accept", "application/json").
                        get().
                        url("http://itdev.mobifone.vn/iSchoolService/rest/mobilews/v2/getSensorList?room_id=" + classid).build();
                try {
                    response = client.newCall(request).execute();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                if (response != null) {
                    JSONObject jObject = null;
                    try {
                        String data = response.body().string();
                        jObject = new JSONObject(data);
                        String datas = jObject.getString("javaResponse");
                        jObject = new JSONObject(datas);
//                        String datas1 = jObject.getString("sensors");
                        JSONArray Jarray = jObject.getJSONArray("sensors");

                        int hum = 0;
                        int temp = 0;
                        for (int i=0; i< Jarray.length() ; i++){
                            JSONObject object0 = Jarray.getJSONObject(i);
                            int type = Integer.parseInt(object0.getString("type"));
                            if(type == 129){
                                hum = object0.getInt("data");
                            }
                            if(type == 128){
                                temp = object0.getInt("data");
                            }

                        }
//                        JSONObject object1 = Jarray.getJSONObject(2);
//                        int hui = Integer.parseInt(object1.getString("data"));
                        runThread(temp,hum);
//                        String humidity = jObject.getString("data");
//                        initRecycalView(temp,hui,door);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return null;
            }

        }.execute();


    }
    private void runThread(final int temp, final int hum ) {

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                initRecycalView(temp,hum);
            }
        });
    }
    @Override
    protected void onResume() {
        if(mVideoView.canPause()){
            mVideoView.resume();
        }
        super.onResume();
    }

    @Override
    protected void onDestroy(){
        mVideoView.release(true);

        super.onDestroy();
    }
    @Override
    protected void onPause() {
        if(mVideoView.isPlaying()){
            mVideoView.pause();
        }
        super.onPause();
    }
}

