import { DataSource } from "typeorm"
import { Student } from "../models/StudentModel"
import { User } from "../models/UserModel"
require ('dotenv').config()

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT_NUMBER as string),
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [Student, User]
})
