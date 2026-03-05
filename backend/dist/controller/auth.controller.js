import bcrypt from "bcryptjs";
import { setUser } from "../services/auth.js";
import { prisma } from "../lib/prisma.js";
const maxAge = 1000 * 60 * 60 * 24 * 3;
export async function handleSignup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("All the details are required");
    }
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        return res.status(400).send("User already exist with this email");
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });
    const token = setUser({
        id: user.id,
        email: user.email,
    });
    res.cookie("uid", token, {
        maxAge,
        httpOnly: true,
    });
    return res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
    });
}
export async function handleLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send("Both Email and Password are required");
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user)
        return res.status(400).send("User not found");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
        return res.status(400).send("Incorrect Password");
    const token = setUser({
        id: user.id,
        email: user.email,
    });
    res.cookie("uid", token, {
        maxAge,
        httpOnly: true,
    });
    return res.status(201).json({
        _id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
    });
}
//# sourceMappingURL=auth.controller.js.map