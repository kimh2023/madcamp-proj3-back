import { IsEmail } from "class-validator";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("tb_users")
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  // @Length(5, 20)
  password: string;

  @Column()
  salt: string;
}
