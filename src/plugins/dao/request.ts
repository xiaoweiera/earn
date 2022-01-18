/**
 * @file 构造请求对象
 */
import Http from "./http"
import { productionAPI } from "src/config/";

// 线上环境专用
const service = Http({ baseURL: productionAPI });

export default service
