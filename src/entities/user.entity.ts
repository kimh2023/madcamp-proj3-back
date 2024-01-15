import { IsEmail } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Board } from "./board.entity";

enum UserType {
  Admin = "admin",
  User = "user",
}

enum InterestType {
  FoodAndDrink = "Food And Drink",
  Technology = "Technology",
}

@Entity("tb_users")
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: "string", default: "" })
  name = "";

  @Column({
    type: "enum",
    enum: InterestType,
    default: InterestType.Technology,
  })
  interest = InterestType.Technology;

  @Column({ nullable: true })
  verificationToken: string | null;

  @Column({ type: "boolean", default: false })
  isVerified = false;

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
  type = UserType.User;

  @OneToMany(() => Board, (board) => board.user)
  board: Board[];
}
