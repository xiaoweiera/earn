// https://www.npmjs.com/package/url

import Url from "url";

const parse = function (value?: string, parseQueryString: boolean = true) {
	let data: Url.Url;
	if (value) {
		data = Url.parse(value, parseQueryString);
	} else {
		data = Url.parse("/", parseQueryString);
	}
	data.search = '';
	return data;
}

export default parse;
