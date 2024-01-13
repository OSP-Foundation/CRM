import { Request, Response } from "express";
import AccountService from "../services/account";

class Account {
    private repo: AccountService;

    constructor() {
        this.repo = new AccountService();
    }

    async RegisterManual(req: Request, res: Response) {
        console.log(req?.body)
    }
}

export default Account;