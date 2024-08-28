package com.jtec.idnow

import de.idnow.sdk.IDnowSDK
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.functions.Coroutine
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

class ExpoIDnowModule : Module() {
    private val currentActivity
        get() = appContext.activityProvider?.currentActivity ?: throw Exceptions.MissingActivity()

    override fun definition() = ModuleDefinition {
        Name("ExpoIDnow")

        AsyncFunction("startIdent") Coroutine { companyId: String, token: String, options: ExpoIDnowOptions ->
            return@Coroutine startIdent(companyId, token, options)
        }
    }

    private suspend fun startIdent(
        companyId: String, token: String, options: ExpoIDnowOptions
    ): String = withContext(Dispatchers.Main) {
        suspendCancellableCoroutine { continuation ->
            try {
                IDnowSDK.getInstance().initialize(currentActivity, companyId, options.language);
                IDnowSDK.setTransactionToken(token)
                IDnowSDK.setNewBrand(true);
                IDnowSDK.setConnectionType(
                    options.connectionType.toIDnowConnectionType(), currentActivity
                )
                IDnowSDK.setEnvironment(options.environment.toIDnowEnvironment());
                IDnowSDK.setShowErrorSuccessScreen(
                    options.showErrorSuccessScreen, currentActivity
                )
                IDnowSDK.setShowVideoOverviewCheck(
                    options.showVideoOverviewCheck, currentActivity
                )
                if (options.calledFromIDnowApp) {
                    IDnowSDK.calledFromIDnowApp(currentActivity)
                }


                IDnowSDK.getInstance().start(IDnowSDK.getTransactionToken()) { result, _ ->
                    if (!continuation.isCompleted) {
                        continuation.resume(ExpoIDnowResponse(result).toJsonString())
                    }
                }
            } catch (e: Exception) {
                if (!continuation.isCompleted) {
                    continuation.resumeWithException(e)
                }
            }
        }
    }
}
