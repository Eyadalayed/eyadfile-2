import express from 'express';
import { createJobOrder, getJobOrders, getJobOrderById, updateJobOrderStatus } from '../controllers/jobOrderController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole(['manager', 'production_leader']), createJobOrder);
router.get('/', authenticateToken, getJobOrders);
router.get('/:id', authenticateToken, getJobOrderById);
router.patch('/:id/status', authenticateToken, authorizeRole(['manager', 'production_leader']), updateJobOrderStatus);

export default router;