import { Request, Response, NextFunction } from 'express';
import pool from '../database';

export const createJobOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { order_number, product_name, quantity } = req.body;

  try {
    if (!order_number || !product_name || !quantity) {
      return res.status(400).json({ message: 'Order number, product name, and quantity are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO job_orders (order_number, product_name, quantity) VALUES (?, ?, ?)',
      [order_number, product_name, quantity]
    );

    res.status(201).json({
      message: 'Job order created successfully',
      id: (result as any).insertId
    });
  } catch (error) {
    next(error);
  }
};

export const getJobOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [jobOrders] = await pool.query('SELECT * FROM job_orders');
    res.json(jobOrders);
  } catch (error) {
    next(error);
  }
};

export const getJobOrderById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const [jobOrders] = await pool.query('SELECT * FROM job_orders WHERE id = ?', [id]);
    
    if ((jobOrders as any[]).length === 0) {
      return res.status(404).json({ message: 'Job order not found' });
    }

    res.json((jobOrders as any[])[0]);
  } catch (error) {
    next(error);
  }
};

export const updateJobOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const [result] = await pool.query(
      'UPDATE job_orders SET status = ? WHERE id = ?',
      [status, id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Job order not found' });
    }

    res.json({ message: 'Job order status updated successfully' });
  } catch (error) {
    next(error);
  }
};