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
						return promise.reject(error ?? Exception(name: "Initialize", description: "IDnow Initialize Error"))
					}
					
					if cancelled {
						return promise.resolve(ExpoIDnowResponse(result: "CANCELED").toJsonString())
					}
					
					controller.startIdentification(from: rootViewController, withCompletionBlock: { _, error, cancelled in
						if error != nil {
							return promise.reject(error ?? Exception(name: "StartIdent", description: "IDnow Start Ident Error"))
						}
						
						if cancelled {
							return promise.resolve(ExpoIDnowResponse(result: "CANCELED").toJsonString())
						}
						
						return promise.resolve(ExpoIDnowResponse(result: "SUCCEED").toJsonString())
					})
				})
			} else {
				return promise.reject(Exception(name: "General", description: "Failed to resolve current Expo Activity"))
			}
		}
	}
}
