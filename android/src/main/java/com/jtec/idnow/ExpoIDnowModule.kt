package com.jtec.idnow

import de.idnow.sdk.IDnowSDK
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoIDnowModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoIDnow")

        AsyncFunction("startIdent") { companyId: String,
                                      token: String,
                                      options: ExpoIDnowOptions,
                                      promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity
            if (activity == null) {
                promise.resolve("Failed to resolve current Expo Activity")
            }

            try {
                IDnowSDK.getInstance().initialize(activity, companyId, options.language);
                IDnowSDK.setTransactionToken(token)
                IDnowSDK.setNewBrand(true);
                IDnowSDK.setConnectionType(
                    options.connectionType.toIDnowConnectionType(),
                    activity
                )
                IDnowSDK.setEnvironment(options.environment.toIDnowEnvironment());

                IDnowSDK.getInstance().start(IDnowSDK.getTransactionToken()) { result, _ ->
                    promise.resolve(ExpoIDnowResponse(result).toJsonString())
                }

            } catch (e: Exception) {
                e.printStackTrace();
                promise.resolve(ExpoIDnowResponse(-1, e.message).toJsonString())
            }
        }
    }
}
