
import ApiTemplate from "./template";
import {Lang} from "src/types/language";

import DApp from "./dapp";
import Blog from "./blog";
import User from "./user";

export default class API extends ApiTemplate {
	public blog: Blog;
	public dApp: DApp;
	public user: User;
	constructor(value?: Lang) {
		super(value);
		this.blog = new Blog(value);
		this.dApp = new DApp(value);
		this.user = new User(value);
	}
}

