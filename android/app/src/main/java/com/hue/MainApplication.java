package com.hue;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.bvic23.rngetpixel.RNPixelColorPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.oblador.vectoricons.VectorIconsPackage;

// import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.ReactRootView;
// import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativenavigation.react.ReactGateway;
import org.pgsqlite.SQLitePluginPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(new SQLitePluginPackage(), new RNFetchBlobPackage(),
                new RNZipArchivePackage(), new LinearGradientPackage(), new RNGestureHandlerPackage(), new VectorIconsPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
