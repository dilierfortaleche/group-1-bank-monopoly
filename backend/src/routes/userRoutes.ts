import express, { Router } from "express";
import controllerUser from "../controllers/userController";

const router: Router = express.Router();

router.post("/register", async (req, res) => {
    await controllerUser.registerUser(req, res);
});

router.post("/login", async (req, res) => {
    await controllerUser.loginUser(req, res);
});

router.get("/", async (req, res)=>{
    await controllerUser.getAllUsers(req, res);
})

export default router;
