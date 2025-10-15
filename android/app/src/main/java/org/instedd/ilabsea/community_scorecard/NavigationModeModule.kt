package org.instedd.ilabsea.community_scorecard

import android.provider.Settings
import com.facebook.react.bridge.*

class NavigationModeModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NavigationMode"

    @ReactMethod
    fun getNavigationMode(promise: Promise) {
        try {
            val resolver = reactContext.contentResolver
            // mode = 0 → 3-button
            // mode = 1 → 2-button
            // mode = 2 → gesture
            val mode = Settings.Secure.getInt(resolver, "navigation_mode", 0)
            promise.resolve(mode)
        } catch (e: Exception) {
            promise.reject("ERR_NAV_MODE", e.message, e)
        }
    }
}