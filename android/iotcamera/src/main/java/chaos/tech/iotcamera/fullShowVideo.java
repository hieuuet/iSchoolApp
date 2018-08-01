package chaos.tech.iotcamera;

import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.TableLayout;

import chaos.tech.iotcamera.application.Settings;
import chaos.tech.iotcamera.content.RecentMediaStorage;
import chaos.tech.iotcamera.fragments.TracksFragment;
import chaos.tech.iotcamera.widget.media.AndroidMediaController;
import chaos.tech.iotcamera.widget.media.IjkVideoView;
import tv.danmaku.ijk.media.player.IjkMediaPlayer;
import tv.danmaku.ijk.media.player.misc.ITrackInfo;

public class fullShowVideo extends AppCompatActivity implements TracksFragment.ITrackHolder{

    private String mVideoPath;
    private Uri mVideoUri;
    RecyclerView horizontal_recycler_view;
    private AndroidMediaController mMediaController;
    private IjkVideoView mVideoView;
    //    private TextView mToastTextView;
    private TableLayout mHudView;
    private DrawerLayout mDrawerLayout;
    private ViewGroup mRightDrawer;
    private boolean mBackPressed;
    private Settings mSettings;
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
        setContentView(R.layout.activity_full_show_video);
        mSettings = new Settings(this);
//        initSizeData();
        // handle arguments
        mVideoPath = getIntent().getStringExtra("videoPath");

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
                        finish();
                        return;
                    }
                    if (scheme.equals(ContentResolver.SCHEME_ANDROID_RESOURCE)) {
                        mVideoPath = mVideoUri.getPath();
                    } else if (scheme.equals(ContentResolver.SCHEME_CONTENT)) {
                        finish();
                        return;
                    } else {
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

//        mToastTextView = (TextView) findViewById(R.id.toast_text_view);
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
            finish();
            return;
        }
        mVideoView.start();
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
}
