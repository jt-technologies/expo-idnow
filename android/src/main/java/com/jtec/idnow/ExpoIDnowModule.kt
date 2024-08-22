package com.jtec.idnow

import de.idnow.sdk.IDnowSDK
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import org.json.JSONObject

data class ExpoIDnowOptions(
    @Field val language: String = "de",
    @Field val environment: String = "LIVE",
    @Field val connectionType: String = "WEBSOCKET",
    @Field val useNewBrand: Boolean = false
)

data class ExpoIDnowResponse(val resultCode: Int, val error: String? = "") {
    private val result: String = when (resultCode) {
        IDnowSDK.RESULT_CODE_FAILED -> "FAILED"
        IDnowSDK.RESULT_CODE_SUCCESS -> "SUCCEED"
        IDnowSDK.RESULT_CODE_CANCEL -> "CANCELLED"
        IDnowSDK.RESULT_CODE_WRONG_IDENT -> "WRONG_IDENT_ERROR"
        IDnowSDK.RESULT_CODE_INTERNAL -> "INTERNAL_ERROR"
        else -> "UNKNOWN"
    }

    fun toJsonString(): String {
        val jsonObj = JSONObject()
        jsonObj.put("result", result)
        jsonObj.put("error", error)
        return jsonObj.toString()
    }
}

class ExpoIDnowModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoIDnow")

        AsyncFunction("startIdent") { token: String,
                                      companyId: String,
                                      options: ExpoIDnowOptions,
                                      promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity
            if (activity == null) {
                promise.resolve("Failed to resolve current Expo Activity")
            }

            try {
                IDnowSDK.getInstance().initialize(activity, companyId, options.language);
                IDnowSDK.setTransactionToken(token)
                IDnowSDK.setNewBrand(options.useNewBrand);

                // TODO:
                // IDnowSDK.setConnectionType(options.connectionType)

                // TODO:
                if (options.environment == "TEST") {
                    IDnowSDK.setEnvironment(IDnowSDK.Server.TEST);
                }

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
