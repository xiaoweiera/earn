import Url from "url";

// 序列化 url
const format = function(data: any): string {
	return Url.format(data);
}


export default format;
