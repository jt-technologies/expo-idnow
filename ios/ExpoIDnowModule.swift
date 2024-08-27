import ExpoModulesCore
import IDnowSDK

public class ExpoIDnowModule: Module {
	public func definition() -> ModuleDefinition {
		Name("ExpoIDnow")

		AsyncFunction("startIdent") { (
			companyId: String,
			token: String,
			options: ExpoIDnowOptions,
			promise: Promise) in
			if let rootViewController = UIApplication.shared.delegate?.window??.rootViewController {
				let settings = IDnowSettings(companyID: companyId, transactionToken: token)
				settings.userInterfaceLanguage = options.language
				settings.connectionType = options.connectionType.toIDnowConnectionType()
				settings.environment = options.environment.toIDnowEnvironment()
				settings.showErrorSuccessScreen = options.showErrorSuccessScreen
				settings.showVideoOverviewCheck = options.showVideoOverviewCheck
				
				let controller = IDnowController(settings: settings)
				controller.initialize(completionBlock: { _, error, cancelled in
					if error != nil {
						let message = error?.localizedDescription
						promise.resolve(ExpoIDnowResponse(result: "FAILED", error: message).toJsonString())
						return
					}
					
					if cancelled {
						promise.resolve(ExpoIDnowResponse(result: "CANCELLED").toJsonString())
						return
					}
					
					controller.startIdentification(from: rootViewController, withCompletionBlock: { _, error, cancelled in
						if error != nil {
							let message = error?.localizedDescription
							promise.resolve(ExpoIDnowResponse(result: "FAILED", error: message).toJsonString())
							return
						}
						
						if cancelled {
							promise.resolve(ExpoIDnowResponse(result: "CANCELLED").toJsonString())
							return
						}
						
						promise.resolve(ExpoIDnowResponse(result: "SUCCEED").toJsonString())
					})
				})

			} else {
				promise.resolve(ExpoIDnowResponse(result: "UNKNOWN").toJsonString())
			}
		}
	}
}
