package org.instedd.ilabsea.community_scorecard;

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Build
import android.view.WindowInsetsController
import android.view.WindowManager
import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "CscMobile"
 
  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
        object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {

            override fun onCreate(savedInstanceState: Bundle?) {
                SplashScreen.show(this@MainActivity) // Show splash screen
                super.onCreate(savedInstanceState)
            }
        }
}
