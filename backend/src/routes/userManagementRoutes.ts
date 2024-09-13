import express from 'express';
import { getAllUsers, updateUserRole, createUser, deleteUser } from '../controllers/userManagementController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/roles';

const router = express.Router();

router.get('/', authenticateToken, authorizeRole([USER_ROLES.MANAGER]), getAllUsers);
router.patch('/:id/role', authenticateToken, authorizeRole([USER_ROLES.MANAGER]), updateUserRole);
router.post('/', authenticateToken, authorizeRole([USER_ROLES.MANAGER]), createUser);
router.delete('/:id', authenticateToken, authorizeRole([USER_ROLES.MANAGER]), deleteUser);

export default router;