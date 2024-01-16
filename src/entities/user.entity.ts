import { IsEmail } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Board } from "./board.entity";

enum UserType {
  Admin = "admin",
  User = "user",
}

export enum InterestType {
  FoodAndDrink = "Food and Drink",
  Technology = "Technology",
}

@Entity("tb_users")
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true, default: "" })
  name: string;

  @Column({
    type: "enum",
    nullable: true,
    enum: InterestType,
    default: InterestType.Technology,
  })
  interest: InterestType;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  // @Length(5, 20)
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.User,
  })
  type: UserType;

  @OneToMany(() => Board, (board) => board.user, { onDelete: "CASCADE" })
  @JoinColumn({ name: "boardId" })
  boards: Board[];
}
