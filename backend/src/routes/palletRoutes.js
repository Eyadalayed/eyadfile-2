"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const palletController_1 = require("../controllers/palletController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['production_leader']), palletController_1.createPallet);
router.get('/', authMiddleware_1.authenticateToken, palletController_1.getPallets);
router.get('/:id', authMiddleware_1.authenticateToken, palletController_1.getPalletById);
router.patch('/:id/status', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['quality_inspector', 'forklift_driver']), palletController_1.updatePalletStatus);
router.post('/scan', authMiddleware_1.authenticateToken, palletController_1.scanPallet);
exports.default = router;
