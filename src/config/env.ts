import path from "path";
import dotenv from "dotenv";
import {ConfigEnv} from "vite";
import safeGet from "@fengqiaogang/safe-get";
import { ImportMetaEnv, production } from "../types/env";

interface Result {
	error?: boolean;
	parsed: ImportMetaEnv;
}

export const getConfig = function(env: ConfigEnv | object): Promise<ImportMetaEnv> {
  let result: Result;
	const mode = safeGet<string>(env, "mode");
  if (mode !== production) {
    const src = path.join(__dirname, "../..", `.env.${mode}`);
		console.log("env src = %s", src);
		result = dotenv.config({
      path: src
    }) as any;
  } else {
    result = dotenv.config() as any;
  }
  if (result.error) {
    return env as any;
  }
  return Promise.resolve(result.parsed);
}

