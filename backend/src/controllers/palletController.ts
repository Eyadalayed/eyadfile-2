import { Request, Response, NextFunction } from 'express';
import pool from '../database';
import { generateQRCode } from '../utils/qrCodeGenerator';

export const createPallet = async (req: Request, res: Response, next: NextFunction) => {
  const { job_order_id } = req.body;

  try {
    if (!job_order_id) {
      return res.status(400).json({ message: 'Job order ID is required' });
    }

    const [jobOrders] = await pool.query('SELECT * FROM job_orders WHERE id = ?', [job_order_id]);
    if ((jobOrders as any[]).length === 0) {
      return res.status(404).json({ message: 'Job order not found' });
    }

    const qrCode = await generateQRCode(job_order_id.toString());

    const [result] = await pool.query(
      'INSERT INTO pallets (job_order_id, qr_code) VALUES (?, ?)',
      [job_order_id, qrCode]
    );

    res.status(201).json({ 
      message: 'Pallet created successfully', 
      id: (result as any).insertId, 
      qrCode 
    });
  } catch (error) {
    next(error);
  }
};

export const getPallets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [pallets] = await pool.query('SELECT * FROM pallets');
    res.json(pallets);
  } catch (error) {
    next(error);
  }
};

export const getPalletById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const [pallets] = await pool.query('SELECT * FROM pallets WHERE id = ?', [id]);
    
    if ((pallets as any[]).length === 0) {
      return res.status(404).json({ message: 'Pallet not found' });
    }

    res.json((pallets as any[])[0]);
  } catch (error) {
    next(error);
  }
};

export const updatePallet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const [result] = await pool.query(
      'UPDATE pallets SET status = ? WHERE id = ?',
      [status, id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Pallet not found' });
    }

    res.json({ message: 'Pallet updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deletePallet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM pallets WHERE id = ?', [id]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Pallet not found' });
    }

    res.json({ message: 'Pallet deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const scanPallet = async (req: Request, res: Response, next: NextFunction) => {
  const { qr_code } = req.body;

  try {
    if (!qr_code) {
      return res.status(400).json({ message: 'QR code is required' });
    }

    const [pallets] = await pool.query('SELECT * FROM pallets WHERE qr_code = ?', [qr_code]);

    if ((pallets as any[]).length === 0) {
      return res.status(404).json({ message: 'Pallet not found' });
    }

    res.json((pallets as any[])[0]);
  } catch (error) {
    next(error);
  }
};

export const getPalletsByJobOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { jobOrderId } = req.params;

  try {
    const [pallets] = await pool.query('SELECT * FROM pallets WHERE job_order_id = ?', [jobOrderId]);
    res.json(pallets);
  } catch (error) {
    next(error);
  }
};