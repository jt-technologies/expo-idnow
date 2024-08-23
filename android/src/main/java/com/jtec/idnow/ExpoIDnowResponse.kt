package com.jtec.idnow

import de.idnow.sdk.IDnowSDK
import org.json.JSONObject

data class ExpoIDnowResponse(val resultCode: Int, val error: String? = null) {
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
        if (error != null) {
            jsonObj.put("error", error)
        }
        return jsonObj.toString()
    }
}