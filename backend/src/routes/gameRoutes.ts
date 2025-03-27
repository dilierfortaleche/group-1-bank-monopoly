import express, { Router } from "express";
import controllerGame from "../controllers/gameController";

const router: Router = express.Router();

router.post("/game", async (req, res) => {
  await controllerGame.createGame(req, res);
});

router.post("/game/join", async (req, res) => {
  await controllerGame.joinGame(req, res);
});

export default router;
