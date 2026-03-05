import jwt from "jsonwebtoken";
import type { ReqUser } from "../types/globals.js";
export declare function setUser(user: ReqUser): string;
export declare function getUser(token: string): string | jwt.JwtPayload;
//# sourceMappingURL=auth.d.ts.map