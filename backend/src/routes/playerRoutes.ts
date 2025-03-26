import express, { Router } from "express";
import controllerPlayer from "../controllers/playerController";

const router: Router = express.Router();

router.get("/", async (req, res) => {
    await controllerPlayer.getAllPlayers(req, res);
});

router.post("/create", async (req, res) => {
    await controllerPlayer.createPlayer(req, res);
});

router.put("/update/:id", async (req, res) => {
    await controllerPlayer.getAllPlayers(req, res);
});

router.delete("/delete/:id", async (req, res) => {
    await controllerPlayer.deletePlayer(req, res);
});

export default router;
