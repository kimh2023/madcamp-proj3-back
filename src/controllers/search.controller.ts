import { type NextFunction, type Request, type Response } from "express";
import searchService from "src/services/search.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const search: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    if (file === undefined) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const response = await searchService.search(file);
    res.json(response);
  },
);

const searchController = {
  search,
};

export default searchController;
