import API from "src/api";

export class Model extends API {
    async getSummary(){
        const result=await this.home.getSummary()
        return result
    }
    async getTopicRank(){
        const result=await this.home.getTopicRank()
        return result
    }
}