import { Board } from "src/entities/board.entity";
import { type User } from "src/entities/user.entity";
import { BoardRepository, UserRepository } from "src/repositories";

const getUser = async (_id: number) => {
  const tmp = await UserRepository.findOne({ where: { _id } });
  if (!tmp) {
    return;
  }

  const newBoard = new Board();
  newBoard.user = tmp;
  const savedBoard = await BoardRepository.save(newBoard);

  const user = UserRepository.findOne({
    where: { _id },
    relations: ["boards"],
  });

  // const user = (
  //   await UserRepository.aggregate([
  //     {
  //       $match: { _id },
  //     },
  //     {
  //       $lookup: {
  //         from: "tb_boards",
  //         localField: "board._id",
  //         foreignField: "_id",
  //         as: "boardInfo",
  //       },
  //     },
  //   ]).toArray()
  // )[0];
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  console.log(user);
};

const userService = { getUser };

export default userService;

const returnPartialUser = (user: User) => {
  return { id: user._id, email: user.email };
};
// {
//     where: { _id },
//     relations: ["board", "board.pin.place"],
//   },
