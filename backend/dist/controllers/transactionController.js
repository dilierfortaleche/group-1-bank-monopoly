"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const reportTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId, player, amount, type } = req.body;
        const newTransaction = new Transaction_1.default({ gameId, player, amount, type });
        yield newTransaction.save();
        res.status(201).json({ message: "Transacción registrada con éxito" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al registrar transacción", error });
    }
});
exports.reportTransaction = reportTransaction;
exports.default = {
    reportTransaction: exports.reportTransaction
};
