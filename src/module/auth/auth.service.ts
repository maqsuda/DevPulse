import { pool } from "../../db/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import type { Iuser } from "../user/user.interface";

const createUserIntoDB = async (payLoad: Iuser) => {
  const { name, email, password, role } = payLoad;
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, role)
        VALUES($1,$2,$3,$4)
        RETURNING *
    `,
    [name, email, hashPassword, role],
  );
  console.log(result);
  delete result.rows[0].password;
  return result;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  console.log(userData);
  // if (userData.rows.length === 0) {
  //   throw new Error("Invalid Credentials!");
  // }

  // // 2. Compare the password -> Done
  // const user = userData.rows[0];
  // const matchPassword = await bcrypt.compare(password, user.password);
  // // console.log(matchPassword);
  // if (!matchPassword) {
  //   throw new Error("Invalid Credentials!");
  // }

  // const jwtpayload = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   role: user.role,
  // };

  // const accessToken = jwt.sign(jwtpayload, config.secret as string, {
  //   expiresIn: "1d",
  // });

  // return { accessToken };
};

export const authService = {
  loginUserIntoDB,
  createUserIntoDB,
};
