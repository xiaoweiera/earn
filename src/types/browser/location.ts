
import Url from "url";

export interface Query {
	[key: string]: string
}

export interface Location extends Url.Url{
}

export interface Href {
	path?: string;
	query?: Query;
}
