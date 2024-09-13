"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobOrderController_1 = require("../controllers/jobOrderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader']), jobOrderController_1.createJobOrder);
router.get('/', authMiddleware_1.authenticateToken, jobOrderController_1.getJobOrders);
router.get('/:id', authMiddleware_1.authenticateToken, jobOrderController_1.getJobOrderById);
router.patch('/:id/status', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['manager', 'production_leader']), jobOrderController_1.updateJobOrderStatus);
exports.default = router;
