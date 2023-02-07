import { Entity, PrimaryGeneratedColumn, Column, createConnection } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.
@Entity({ name: "student-records" })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobile!: string;

  @Column()
  dob!: Date;

  @Column()
  age!: number;

}