import { Request } from "express";
import { Multer } from "multer";

export interface multerRequest extends Request {
  file?: Express.Multer.File;
}

export type MimeType = string;