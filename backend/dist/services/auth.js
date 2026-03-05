import jwt from "jsonwebtoken";
export function setUser(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
}
export function getUser(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
//# sourceMappingURL=auth.js.map