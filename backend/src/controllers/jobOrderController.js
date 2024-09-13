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
exports.updateJobOrderStatus = exports.getJobOrderById = exports.getJobOrders = exports.createJobOrder = void 0;
const database_1 = __importDefault(require("../database"));
const createJobOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_number, product_name, quantity } = req.body;
    try {
        const [result] = yield database_1.default.query('INSERT INTO job_orders (order_number, product_name, quantity) VALUES (?, ?, ?)', [order_number, product_name, quantity]);
        res.status(201).json({ message: 'Job order created successfully', id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating job order', error });
    }
});
exports.createJobOrder = createJobOrder;
const getJobOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [jobOrders] = yield database_1.default.query('SELECT * FROM job_orders');
        res.json(jobOrders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching job orders', error });
    }
});
exports.getJobOrders = getJobOrders;
const getJobOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [jobOrders] = yield database_1.default.query('SELECT * FROM job_orders WHERE id = ?', [id]);
        if (jobOrders.length === 0) {
            return res.status(404).json({ message: 'Job order not found' });
        }
        res.json(jobOrders[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching job order', error });
    }
});
exports.getJobOrderById = getJobOrderById;
const updateJobOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        yield database_1.default.query('UPDATE job_orders SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Job order status updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating job order status', error });
    }
});
exports.updateJobOrderStatus = updateJobOrderStatus;
