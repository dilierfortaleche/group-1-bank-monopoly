import express, { Router } from "express";
import controllerGame from "../controllers/gameController";

const router: Router = express.Router();

router.post("/register", async (req, res) => {
    await controllerGame.createGame(req, res);
});

router.post("/login", async (req, res) => {
    await controllerGame.joinGame(req, res);
});

export default router;