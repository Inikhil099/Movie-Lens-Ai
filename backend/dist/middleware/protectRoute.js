import { getUser } from "../services/auth.js";
export function ProtectRoutes(req, res, next) {
    try {
        const token = req.cookies.uid;
        if (!token) {
            return res.status(401).send("Not authenticated");
        }
        const user = getUser(token);
        if (!user) {
            return res.status(401).send("Not authenticated");
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).send("Sorry Internal Server Error");
    }
}
//# sourceMappingURL=protectRoute.js.map