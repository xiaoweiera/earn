
import type Url from "url";

export type Query = Record<string, string>;

export interface Location extends Url.Url{
}

export interface Href {
	path?: string;
	query?: Query;
}
