import type Url from "url";

export type Query = Record<string, string>;

export type Location = Url.Url;

export interface Href {
  path?: string;
  query?: Query;
}
