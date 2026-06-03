import { pool } from "../../db";
import type { Iuser } from "./user.interface";
import bcrypt from "bcryptjs";

const getAllUserIntoDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
  `);
  delete result.rows[0].password;
  return result;
};

const getSingleUserIntoDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1  
        `,
    [id],
  );
  delete result.rows[0].password;
  return result;
};
const updateUserIntoDB = async (payLoad: Iuser, id: string) => {
  const { name, password, role } = payLoad;
  const result = await pool.query(
    `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    role=COALESCE($3,role),
   
    WHERE id=$5 RETURNING *
    `,
    [name, password, role, id],
  );
  delete result.rows[0].password;
  return result;
};

const deleteUserIntoDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1  
      `,
    [id],
  );
  delete result.rows[0].password;
  return result;
};

export const userService = {
  getAllUserIntoDB,
  getSingleUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
