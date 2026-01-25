import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { LoginService } from "../service/loginService";
import { Response, Request, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";

@injectable()
export class LoginController {
    constructor(@inject(TYPES.LoginService) private loginService: LoginService) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.loginService.login(req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.LOGIN_SUCCESSFULLY,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}

