package com.jtec.idnow

import de.idnow.sdk.IDnowSDK
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.Enumerable

enum class ExpoIDnowConnectionType(val value: String) : Enumerable {
    WEBSOCKET("websocket"),
    LONG_POOLING("longPolling");

    fun toIDnowConnectionType(): IDnowSDK.ConnectionType {
        return when (this) {
            WEBSOCKET -> IDnowSDK.ConnectionType.WEBSOCKET
            LONG_POOLING -> IDnowSDK.ConnectionType.LONG_POLLING
        };
    }
}

enum class ExpoIDnowEnvironment(val value: String) : Enumerable {
    DEV("dev"),
    DEV0("dev0"),
    DEV1("dev1"),
    DEV2("dev2"),
    DEV3("dev3"),
    DEV4("dev4"),
    DEV5("dev5"),
    DEV6("dev6"), // iOS only
    DEV7("dev7"),
    DEV8("dev8"),
    DEV9("dev9"),

    TEST("test"),
    TEST1("test1"),
    TEST2("test2"),
    TEST3("test3"),

    INT("int"),
    INTRUM("intrum"), // iOS only
    INTRUM_TEST("intrumTest"), // iOS only

    LIVE("live"),
    STAG1("staging1"),

    CUSTOM("custom"),
    NOT_DEFINED("notDefined");

    fun toIDnowEnvironment(): IDnowSDK.Server? {
        return when (this) {
            DEV -> IDnowSDK.Server.DEV
            DEV0 -> IDnowSDK.Server.DV0
            DEV1 -> IDnowSDK.Server.DV1
            DEV2 -> IDnowSDK.Server.DEV2
            DEV3 -> IDnowSDK.Server.DV3
            DEV4 -> IDnowSDK.Server.DV4
            DEV5 -> IDnowSDK.Server.DV5
            DEV6 -> null
            DEV7 -> IDnowSDK.Server.DV7
            DEV8 -> IDnowSDK.Server.DV8
            DEV9 -> IDnowSDK.Server.DV9
            TEST -> IDnowSDK.Server.TEST
            TEST1 -> IDnowSDK.Server.TEST1
            TEST2 -> IDnowSDK.Server.TEST2
            TEST3 -> IDnowSDK.Server.TEST3
            INT -> IDnowSDK.Server.INT
            INTRUM -> null
            INTRUM_TEST -> null
            LIVE -> IDnowSDK.Server.LIVE
            STAG1 -> IDnowSDK.Server.SG1
            CUSTOM -> IDnowSDK.Server.CUSTOM
            NOT_DEFINED -> null
        }
    }
}

data class ExpoIDnowOptions(
    @Field val language: String = "de",
    @Field val connectionType: ExpoIDnowConnectionType = ExpoIDnowConnectionType.WEBSOCKET,
    @Field val environment: ExpoIDnowEnvironment = ExpoIDnowEnvironment.NOT_DEFINED,
    @Field val showErrorSuccessScreen: Boolean = true,
    @Field val showVideoOverviewCheck: Boolean = true,
    @Field val calledFromIDnowApp: Boolean = true,
) : Record
