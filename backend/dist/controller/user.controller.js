import { prisma } from "../lib/prisma.js";
export async function getUserDetails(req, res) {
    const user = await prisma.user.findFirst({
        where: {
            id: req.user.id,
        },
        select: { email: true, id: true, credits: true, name: true },
    });
    return res.status(200).json(user);
}
export async function LogoutUser(req, res) {
    res.cookie("uid", "", { maxAge: 1 });
    return res.status(200).send("Logged out successfully");
}
//# sourceMappingURL=user.controller.js.map