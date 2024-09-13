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
const database_1 = __importDefault(require("./database"));
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.getConnection();
        try {
            yield connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('manager', 'forklift_driver', 'production_leader', 'quality_inspector', 'machine_operator') NOT NULL
      )
    `);
            yield connection.query(`
      CREATE TABLE IF NOT EXISTS job_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(255) NOT NULL UNIQUE,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
            yield connection.query(`
      CREATE TABLE IF NOT EXISTS pallets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_order_id INT,
        qr_code VARCHAR(255) NOT NULL UNIQUE,
        status ENUM('produced', 'quality_checked', 'in_warehouse') NOT NULL DEFAULT 'produced',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_order_id) REFERENCES job_orders(id)
      )
    `);
            console.log('Tables created successfully');
        }
        catch (error) {
            console.error('Error creating tables:', error);
        }
        finally {
            connection.release();
        }
    });
}
createTables();
