import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import controllerTransaction from "../controllers/transactionController";

const router: Router = express.Router();

router.post("/register", asyncHandler(controllerTransaction.reportTransaction));
router.get("/history/:gameId", asyncHandler(controllerTransaction.getTransactionHistory));

export default router;
