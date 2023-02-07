import { Entity, PrimaryGeneratedColumn, Column, createConnection } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.
@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

}