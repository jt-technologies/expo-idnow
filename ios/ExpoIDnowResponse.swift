import IDnowSDK

struct ExpoIDnowResponse: Codable {
	var result: String
	var error: String?

	init(result: String, error: String? = nil) {
		self.result = result
		self.error = error
	}

	func toJsonString() -> String {
		do {
			let jsonData = try JSONEncoder().encode(self)
			let jsonString = String(data: jsonData, encoding: .utf8)!
			return jsonString
		} catch {
			return "Filed to parse ExpoIDnowResponse: \(error)"
		}
	}
}
