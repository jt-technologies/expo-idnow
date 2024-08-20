package com.jtec.idnow

import de.idnow.core.IDnowResult
import org.json.JSONObject

data class ExpoIDnowResponse(val status: String, val resultType: IDnowResult.ResultType) {
    private val result: String = when (resultType) {
        IDnowResult.ResultType.CANCELLED -> "CANCELLED"
        IDnowResult.ResultType.FINISHED -> "FINISHED"
        IDnowResult.ResultType.ERROR -> "ERROR"
        else -> "UNKNOWN"
    }

    fun json(): JSONObject {
        val jsonObj = JSONObject()
        jsonObj.put("status", status)
        jsonObj.put("result", result)
        return jsonObj
    }
}