import API from "src/api";

export class Model extends API {
	getSummary() {
		return this.home.getSummary()
	}

	getTopicRank() {
		return this.home.getTopicRank()
	}
}
