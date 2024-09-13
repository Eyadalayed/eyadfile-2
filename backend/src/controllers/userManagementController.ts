import { Request, Response } from 'express';
import pool from '../database';
import { USER_ROLES } from '../utils/roles';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [users] = await pool.query('SELECT id, username, role FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!Object.values(USER_ROLES).includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  if (!Object.values(USER_ROLES).includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    res.status(201).json({ message: 'User created successfully', id: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};