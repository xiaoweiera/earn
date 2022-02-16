
import user from "./user";
import { Router } from "express";


const common = Router();

common.use(user);

export default common;
