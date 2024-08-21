import ExpoModulesCore
import IDNowSDKCore

struct ExpoIDnoResponse: Codable {
	var status: String
	var resultType: String

	init(status: IDNowSDK.IdentResult.statusCode, resultType: IDNowSDK.IdentResult.type) {
		self.status = status.description

		switch resultType {
		case IDNowSDK.IdentResult.type.CANCELLED:
			self.resultType = "CANCELLED"
		case IDNowSDK.IdentResult.type.FINISHED:
			self.resultType = "FINISHED"
		case IDNowSDK.IdentResult.type.ERROR:
			self.resultType = "ERROR"
		default:
			self.resultType = "UNKNOWN"
		}
	}

	func toJsonString() -> String {
		do {
			let jsonData = try JSONEncoder().encode(self)
			let jsonString = String(data: jsonData, encoding: .utf8)!
			return jsonString
		} catch {
			return "Filed to parse ExpoIDnoResponse: \(error)"
		}
	}
}

public class ExpoIDnowModule: Module {
	public func definition() -> ModuleDefinition {
		Name("ExpoIDnow")

		AsyncFunction("startIdent") { (token: String, _: String, promise: Promise) in
			if let rootViewController = UIApplication.shared.delegate?.window??.rootViewController {
				func listener(result: IDNowSDK.IdentResult.type, statusCode: IDNowSDK.IdentResult.statusCode, message: String) {
					let expoResponse = ExpoIDnoResponse(status: statusCode, resultType: result)
					promise.resolve(expoResponse.toJsonString())
				}

				IDNowSDK.shared.start(token: token, fromViewController: rootViewController, listener: listener)
			} else {
				promise.resolve("Failed to resolve rootViewControler")
			}
		}
	}
}
