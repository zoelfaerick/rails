package com.example.weathermaster;


import android.Manifest;
import android.animation.ArgbEvaluator;
import android.animation.ObjectAnimator;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.ContextThemeWrapper;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class Homelocations extends AppCompatActivity {

    private WebView webview;
    private boolean isFirstLoad = true;
    private static final int PERMISSION_REQUEST_CODE_HOME = 2;

    public void onBackPressed() {
        if (webview.canGoBack()) {
            webview.goBack();
        } else {
            super.onBackPressed();
        }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SharedPreferences prefs = getSharedPreferences("theme_prefs", MODE_PRIVATE);
        boolean isDarkMode = prefs.getBoolean("theme_mode", false);
        setAppTheme(this, isDarkMode);
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_main);


        // Webview stuff
        webview = findViewById(R.id.webView);
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setAllowContentAccess(true);
        webview.setVerticalScrollBarEnabled(true);
        webview.setHorizontalScrollBarEnabled(false);
        webview.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        webview.setWebViewClient(new WebViewClientDemo());
        AndroidInterface androidInterface = new AndroidInterface(this);
        webview.addJavascriptInterface(androidInterface, "AndroidInterface");
        webview.addJavascriptInterface(new BackActivityInterface(this), "BackActivityInterface");
        webview.addJavascriptInterface(new NavigateActivityInterface(this), "OpenActivityInterface");
        webview.addJavascriptInterface(new AndroidFunctionActivityInterface(this), "AndroidFunctionActivityInterface");
        webSettings.setTextZoom(100);
        webSettings.setAllowFileAccess(true);
        webview.loadUrl("file:///android_asset/pages/Homelocations.html");

        webview.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                view.getContext().startActivity(intent);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                if (isFirstLoad) {
                    isFirstLoad = false;

                    int primaryColor = new ContextThemeWrapper(Homelocations.this, R.style.Base_Theme_WeatherMaster)
                            .getTheme()
                            .obtainStyledAttributes(new int[]{com.google.android.material.R.attr.colorPrimary})
                            .getColor(0, 0);

                    String hexColor = String.format("#%06X", (0xFFFFFF & primaryColor));
                    String jsCodePrimaryColor = "CreateMaterialYouTheme('" + hexColor + "');";

                    webview.evaluateJavascript(jsCodePrimaryColor, null);
                }
            }
        });

    }


    private void requestLocationPermissionsHome() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},
                    PERMISSION_REQUEST_CODE_HOME);
        } else {
            webview.evaluateJavascript("setCurrentLocation('deviceLocation');", null);

        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CODE_HOME) {
            if (grantResults.length > 0 && (grantResults[0] == PackageManager.PERMISSION_GRANTED ||
                    grantResults[1] == PackageManager.PERMISSION_GRANTED)) {
                webview.evaluateJavascript("setCurrentLocation('deviceLocation');", null);
            } else {


            }
        }

    }

    public class NavigateActivityInterface {
        private final Context mContext;

        public NavigateActivityInterface(Context context) {
            this.mContext = context;
        }

        @JavascriptInterface
        public void OpenActivity(final String activityName) {
            Intent intent = null;

            switch (activityName) {
                case "--":
                    break;
                default:
                    Toast.makeText(mContext, "Activity not found", Toast.LENGTH_SHORT).show();
                    return;
            }

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mContext.startActivity(intent);

        }
    }

    public class BackActivityInterface {
        private final Activity gActivity;

        public BackActivityInterface(Activity activity) {
            this.gActivity = activity;
        }

        @JavascriptInterface
        public void CloseActivity() {
            gActivity.runOnUiThread(() -> gActivity.onBackPressed());
        }
    }

    public void goBack() {
        runOnUiThread(this::onBackPressed);
    }

    public class AndroidFunctionActivityInterface {
        private Homelocations mActivity;

        AndroidFunctionActivityInterface(Homelocations activity) {
            mActivity = activity;
        }

        @JavascriptInterface
        public void androidFunction(final String functiontype) {
            mActivity.runOnUiThread(new Runnable() {
                @SuppressLint("ResourceType")
                @RequiresApi(api = Build.VERSION_CODES.O)
                @Override
                public void run() {
                    if (functiontype.equals("homeLocationLocationReq")){
                        requestLocationPermissionsHome();
                        return;
                    }
            }
        });
    }
}
    public class AndroidInterface {
        private Homelocations mActivity;

        AndroidInterface(Homelocations activity) {
            mActivity = activity;
        }

        @JavascriptInterface
        public void updateStatusBarColor(final String colorStatus, final String colorNav, final String UiFlag, final String FlagAnim) {
            mActivity.runOnUiThread(new Runnable() {
                @SuppressLint("ResourceType")
                @RequiresApi(api = Build.VERSION_CODES.O)
                @Override
                public void run() {
                    int statusBarColor;
                    int navigationBarColor;
                    int systemUiVisibilityFlags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;

                    if (colorStatus != null && !colorStatus.isEmpty()) {
                        statusBarColor = Color.parseColor(colorStatus);
                        navigationBarColor = Color.parseColor(colorNav);
                        if ("1".equals(UiFlag)) {
                            systemUiVisibilityFlags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                            setAppTheme(mActivity, false);
                        } else {
                            systemUiVisibilityFlags = 0;
                            setAppTheme(mActivity, true);
                        }
                    } else {
                        Toast.makeText(mActivity, "not found", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    int currentStatusBarColor = mActivity.getWindow().getStatusBarColor();
                    int currentNavigationBarColor = mActivity.getWindow().getNavigationBarColor();

                    int animationDuration = 0;
                    try {
                        animationDuration = Integer.parseInt(FlagAnim);
                    } catch (NumberFormatException e) {
                        animationDuration = 0;
                    }


                    ObjectAnimator statusBarAnimator = ObjectAnimator.ofObject(
                            mActivity.getWindow(),
                            "statusBarColor",
                            new ArgbEvaluator(),
                            currentStatusBarColor,
                            statusBarColor
                    );

                    statusBarAnimator.setDuration(animationDuration);
                    statusBarAnimator.start();

                    ObjectAnimator navBarAnimator = ObjectAnimator.ofObject(
                            mActivity.getWindow(),
                            "navigationBarColor",
                            new ArgbEvaluator(),
                            currentNavigationBarColor,
                            navigationBarColor
                    );

                    navBarAnimator.setDuration(animationDuration);
                    navBarAnimator.start();

                    mActivity.getWindow().setNavigationBarColor(navigationBarColor);

                    View decorView = mActivity.getWindow().getDecorView();
                    decorView.setSystemUiVisibility(systemUiVisibilityFlags);

                }
            });
        }
    }
    private static class WebViewClientDemo extends WebViewClient {

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (shouldOpenInBrowser(url)) {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                view.getContext().startActivity(intent);
                return true;

            } else {
                view.loadUrl(url);
                return true;


            }


        }

        private boolean shouldOpenInBrowser(String url) {
            return url.startsWith("https://fonts.google.com/specimen/Outfit?query=outfit") ||
                    url.startsWith("https://openweathermap.org/") ||
                    url.startsWith("https://fonts.google.com/specimen/Poppins?query=poppins") ||
                    url.startsWith("https://github.com/material-components/material-web") ||
                    url.startsWith("https://app-privacy-policy-generator.nisrulz.com/") ||
                    url.startsWith("https://github.com/PranshulGG/WeatherMaster") ||
                    url.startsWith("mailto:pranshul.devmain@gmail.com")||
                    url.startsWith("https://github.com/PranshulGG/WeatherMaster/releases");


        }


    }
    public void setAppTheme(Context context, boolean isDarkMode) {
        // Save theme preference
        SharedPreferences prefs = context.getSharedPreferences("theme_prefs", Context.MODE_PRIVATE);
        prefs.edit().putBoolean("theme_mode", isDarkMode).apply();

        // Apply the theme
        if (isDarkMode) {
            context.setTheme(R.style.ThemeMainBlackDark);
        } else {
            context.setTheme(R.style.ThemeMainBlackLight);
        }
    }
}