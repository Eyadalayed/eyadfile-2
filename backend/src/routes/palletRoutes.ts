import express from 'express';
import { 
  createPallet, 
  getPallets, 
  getPalletById, 
  updatePallet, 
  deletePallet, 
  scanPallet, 
  getPalletsByJobOrder 
} from '../controllers/palletController';
import { authorizeRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authorizeRole(['manager', 'production_leader']), createPallet);
router.get('/', authorizeRole(['manager', 'production_leader', 'quality_inspector']), getPallets);
router.get('/:id', authorizeRole(['manager', 'production_leader', 'quality_inspector']), getPalletById);
router.put('/:id', authorizeRole(['manager', 'production_leader']), updatePallet);
router.delete('/:id', authorizeRole(['manager']), deletePallet);
router.post('/scan', authorizeRole(['quality_inspector', 'forklift_driver']), scanPallet);
router.get('/job-order/:jobOrderId', authorizeRole(['manager', 'production_leader']), getPalletsByJobOrder);

export default router;