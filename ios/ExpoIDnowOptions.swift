import ExpoModulesCore
import IDnowSDK

enum ExpoIDnowConnectionType: String, Enumerable {
	case websocket
	case longPolling

	func toIDnowConnectionType() -> IDnowConnectionType {
		switch self {
		case .websocket:
			return .websocket
		case .longPolling:
			return .longPolling
		}
	}
}

enum ExpoIDnowEnvironment: String, Enumerable {
	case dev
	case dev0
	case dev1
	case dev2
	case dev3
	case dev4
	case dev5
	case dev6
	case dev7
	case dev8
	case dev9

	case test
	case test1
	case test2
	case test3

	case int // Android only
	case intrum
	case intrumTest

	case live
	case staging1

	case custom
	case notDefined

	func toIDnowEnvironment() -> IDnowEnvironment {
		switch self {
		case .dev:
			return .dev
		case .dev0:
			return .dev0
		case .dev1:
			return .dev1
		case .dev2:
			return .dev2
		case .dev3:
			return .dev3
		case .dev4:
			return .dev4
		case .dev5:
			return .dev5
		case .dev6:
			return .dev6
		case .dev7:
			return .dev7
		case .dev8:
			return .dev8
		case .dev9:
			return .dev9
		case .test:
			return .test
		case .test1:
			return .test1
		case .test2:
			return .test2
		case .test3:
			return .test3
		case .int:
			return .notDefined
		case .intrum:
			return .intrum
		case .intrumTest:
			return .intrumTest
		case .live:
			return .live
		case .staging1:
			return .stag1
		case .custom:
			return .custom
		case .notDefined:
			return .notDefined
		}
	}
}

struct ExpoIDnowOptions: Record {
	@Field var language: String = "de"
	@Field var connectionType: ExpoIDnowConnectionType = .websocket
	@Field var environment: ExpoIDnowEnvironment = .notDefined
	@Field var showErrorSuccessScreen: Bool = true
	@Field var showVideoOverviewCheck: Bool = true
	@Field var calledFromIDnowApp: Bool = true
}
