import Url from "url";

// εΊεε url
const format = function(data: any): string {
  return Url.format(data);
};

export default format;
