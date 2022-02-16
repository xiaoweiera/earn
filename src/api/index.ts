
import ApiTemplate from "./template";
import {Lang} from "src/types/language";

import DApp from "./dapp";
import Blog from "./blog"

export default class API extends ApiTemplate {
	public blog: Blog;
	public dApp: DApp
	constructor(value?: Lang) {
		super(value);
		this.blog = new Blog(value);
		this.dApp = new DApp(value);
	}
}

