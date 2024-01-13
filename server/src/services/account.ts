import { User } from "../models";

class AccountService {
    private user: typeof User;

    constructor() {
        this.user = User;
    }
}

export default AccountService;