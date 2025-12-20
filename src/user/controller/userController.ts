import { injectable } from "inversify";
import { Request,Response,NextFunction } from "express";

@injectable()
export class UserController{

  constructor(){
  }

  async getUsers(req:Request,res:Response,next:NextFunction){
    try {
      
    } catch (error) {
      
    }
  }
  
}