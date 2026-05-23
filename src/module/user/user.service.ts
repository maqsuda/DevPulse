import { pool } from "../../db";
import type { Iuser } from "./user.interface";

const createUserIntoDB = async (payLoad: Iuser) => {
  const { name, email, password, role } = payLoad;
  // console.log(payLoad);
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, role)
        VALUES($1,$2,$3,$4)
        RETURNING *
    `,
    [name, email, password, role],
  );
  // console.log(result);
  return result;
};

const getAllUserIntoDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
  `);
  return result;
};

const getSingleUserIntoDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1  
        `,
    [id],
  );
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
  return result;
};

const deleteUserIntoDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1  
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
