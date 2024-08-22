package com.jtec.idnow

import de.idnow.core.IDnowConfig
import de.idnow.core.IDnowResult
import de.idnow.core.IDnowSDK
import de.idnow.core.IDnowSDK.IDnowResultListener
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONObject

data class ExpoIDnowResponse(val status: String, val resultType: IDnowResult.ResultType) {
    private val result: String = when (resultType) {
        IDnowResult.ResultType.CANCELLED -> "CANCELLED"
        IDnowResult.ResultType.FINISHED -> "FINISHED"
        IDnowResult.ResultType.ERROR -> "ERROR"
        else -> "UNKNOWN"
    }

    fun toJsonString(): String {
        val jsonObj = JSONObject()
        jsonObj.put("result", result)
        jsonObj.put("status", status)
        return jsonObj.toString()
    }
}

class ExpoIDnowModule : Module() {
    private lateinit var idnowSdk: IDnowSDK

    override fun definition() = ModuleDefinition {
        Name("ExpoIDnow")

        AsyncFunction("init") { language: String, promise: Promise ->
            val activity = appContext.activityProvider?.currentActivity
            val idnowConfig = IDnowConfig.Builder
                .getInstance()
                .withLanguage(language)
                .build()

            idnowSdk = IDnowSDK.getInstance()
            if (activity != null) {
                idnowSdk.initialize(activity, idnowConfig)
                promise.resolve("initialized sdk with language: $language")
            } else {
                promise.resolve("Failed to resolve idnow init activity is empty")
            }
        }

        AsyncFunction("startIdent") { token: String, _language: String, promise: Promise ->
            println("token: $token")
            val listener = IDnowResultListener { result: IDnowResult ->
                val expoResponse = ExpoIDnowResponse(result.statusCode, result.resultType)
                promise.resolve(expoResponse.toJsonString())
            }

            idnowSdk.startIdent(token, listener)
        }
    }
}
