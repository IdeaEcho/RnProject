package com.rnproject;

import com.facebook.react.ReactActivity;
import com.yunpeng.alipay.AlipayPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new AlipayPackage()
        );
    }
    @Override
    protected String getMainComponentName() {
        return "RnProject";
    }
}
