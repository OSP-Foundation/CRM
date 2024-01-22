import { NextFunction, Request, Response } from "express";
import AccountService from "../services/account"
import { FiveDigit } from "../utils";
import sendMail from "../config/mail";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

class Account {
    private repo: AccountService;
    private expire: number;
    private JWT_SECRET: string;

    constructor() {
        this.repo = new AccountService();
        this.expire = (60000 * (60 * 24)) * 2;
        this.JWT_SECRET = process?.env?.JWT_SECRET || ''
    }

    async CheckLogged(req: Request, res: Response, next: NextFunction,
        unAuth: boolean = false) {
        const { token } = req?.cookies;

        Jwt.verify(token, this.JWT_SECRET, async (err: any, decode: any) => {
            if (decode?._id?.length >= 24) {
                try {
                    let userData = await this.repo.getUser(decode?._id);

                    if (userData) {
                        if (!unAuth) {
                            req.query.userId = userData?._id?.toString?.();

                            next();
                        } else {
                            res.status(208).json({
                                status: 208,
                                message: "Already Logged",
                                data: {
                                    _id: userData?._id,
                                    email: userData?.email,
                                    name: userData?.name
                                },
                            });
                        }
                    }
                } catch (err) {
                    if (!unAuth) {
                        res.clearCookie("token").status(405).json({
                            status: 405,
                            message: "User Not Logged",
                        });
                    } else {
                        res.clearCookie("token");
                        next();
                    }
                }
            } else {
                if (!unAuth) {
                    res.clearCookie("token").status(405).json({
                        status: 405,
                        message: "User Not Logged",
                    });
                } else {
                    res.clearCookie("token");
                    next();
                }
            }
        });
    }

    async getMe(req: Request, res: Response) {
        const { token } = req?.cookies;

        Jwt.verify(token, this.JWT_SECRET, async (err: any, decode: any) => {
            if (decode?._id?.length >= 24) {
                try {
                    let userData = await this.repo.getUser(decode?._id);

                    if (userData) {
                        res.status(200).json({
                            status: 200,
                            message: "Already Logged",
                            data: {
                                _id: userData?._id,
                                email: userData?.email,
                                name: userData?.name
                            },
                        });
                    }
                } catch (err) {
                    res.clearCookie("token").status(405).json({
                        status: 405,
                        message: "User Not Logged",
                    });
                }
            } else {
                res.clearCookie("token").status(405).json({
                    status: 405,
                    message: "User Not Logged",
                });
            }
        });
    }

    async requestRegister(req: Request, res: Response) {
        let { name, email, password } = req?.body;

        if (name && email && password?.length >= 8) {
            email = email?.toLowerCase?.();

            let secret: string = FiveDigit?.();

            try {
                const existing = await this.repo.findByEmail(email);

                if (!existing) {
                    const response = await this.repo.createTemp({
                        email,
                        secret,
                        type: "register"
                    })

                    await sendMail(
                        {
                            to: email,
                            subject: `${process?.env?.TITLE} Register Verification Code`,
                            content: secret
                        })

                    res.status(200).json({
                        status: 200,
                        message: "Register Otp Sented",
                        data: response?.email,
                    });
                } else {
                    res?.status(422)?.json({
                        status: 422,
                        message: "Already Registered Email",
                    });
                }
            } catch (err: any) {
                if (err?.status) {
                    res.status(err.status).json(err);
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: password?.length >= 8 ? "Enter correct data" : 'Password Should Minimum 8 Length',
            });
        }
    }

    async registerVerify(req: Request, res: Response) {
        if (req?.body?.password?.length >= 8) {
            try {
                const response = await this.repo.getTemp({
                    email: req?.body?.email?.toLowerCase?.(),
                    secret: req?.body?.OTP,
                    type: "register"
                })

                if (response) {
                    const password = await bcrypt?.hash(req?.body?.password, 10)

                    const user = await this.repo.insertUser({
                        email: req?.body?.email,
                        name: req?.body?.name,
                        password
                    })

                    res?.status(200).json({
                        status: 200,
                        message: "Success",
                        data: user
                    })
                } else {
                    res?.status(422).json({
                        status: 422,
                        message: "Wrong Verification"
                    })
                }
            } catch (err: any) {
                if (err?.status) {
                    res.status(err.status).json(err);
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: 'Password Should Minimum 8 Length',
            });
        }
    }

    async registerGoogle(req: Request, res: Response) {
        let { token, email, name, password } = req?.body;

        if (name && email &&
            password?.length >= 8
        ) {
            email = email?.toLowerCase?.()

            try {
                const google = await this.repo.googleVerify(token)

                if (google == email) {

                    password = await bcrypt.hash(password, 10)

                    const user = await this.repo.insertUser({
                        email,
                        password,
                        name
                    })

                    res?.status(200).json({
                        status: 200,
                        message: "Success",
                        data: user
                    })
                } else {
                    res.status(500).json({
                        status: 500,
                        message: "Something Wrong",
                    });
                }
            } catch (err: any) {
                if (err?.status) {
                    res.status(err.status).json(err);
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: password?.length >= 8 ? "Enter correct data" : 'Password Should Minimum 8 Length',
            });
        }
    }

    async loginGoogle(req: Request, res: Response) {
        let { token } = req?.query

        if (token) {
            try {
                let google = await this.repo.googleVerify(typeof token == 'string' ? token : '')

                const user = await this.repo.findByEmail(google)

                if (user) {
                    const JwtToken = Jwt.sign(
                        {
                            _id: user?._id,
                        },
                        this.JWT_SECRET,
                        {
                            expiresIn: this.expire / 1000,
                        }
                    );

                    res
                        .status(200)
                        .cookie("token", JwtToken, {
                            httpOnly: true,
                            expires: new Date(Date.now() + this.expire),
                        })
                        .json({
                            status: 200,
                            message: "Success",
                            data: {
                                _id: user?._id,
                                name: user?.name,
                                email: user?.email
                            },
                        });
                } else {
                    res.status(422).json({
                        status: 422,
                        message: "Enter valid data.",
                    });
                }
            } catch (err: any) {
                if (err?.status) {
                    res?.status(err?.status).json(err)
                } else {
                    res.status(500).json({
                        status: 500,
                        message: typeof err == 'string' ? err : 'Something Went Wrong',
                    });
                }
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Invalid Access",
            });
        }
    }

    async loginManual(req: Request, res: Response) {
        let { email, password } = req?.query

        if (typeof email == 'string' &&
            typeof password == 'string' &&
            password?.length >= 8
        ) {
            email = email?.toLowerCase()

            try {
                const user = await this.repo.findByEmail(email)

                if (user) {
                    const match = await bcrypt.compare(password, user?.password)

                    if (match) {
                        const token = Jwt.sign(
                            {
                                _id: user?._id,
                            },
                            this.JWT_SECRET,
                            {
                                expiresIn: this.expire / 1000,
                            }
                        );

                        res
                            .status(200)
                            .cookie("token", token, {
                                httpOnly: true,
                                expires: new Date(Date.now() + this.expire),
                            })
                            .json({
                                status: 200,
                                message: "Success",
                                data: {
                                    _id: user?._id,
                                    name: user?.name,
                                    email: user?.email
                                },
                            });
                    } else {
                        res.status(422).json({
                            status: 422,
                            message: "Enter valid data.",
                        });
                    }
                } else {
                    res.status(422).json({
                        status: 422,
                        message: "Enter valid data.",
                    });
                }
            } catch (err: any) {
                if (err?.status) {
                    res?.status(err?.status).json(err)
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: "Enter valid data.",
            });
        }
    }

    async requestForgot(req: Request, res: Response) {
        let { email } = req.body;

        email = email?.toLowerCase?.();

        const secret: string = FiveDigit?.();

        try {
            const existing = await this.repo.findByEmail(email);

            if (existing) {
                const response = await this.repo.createTemp({
                    email,
                    secret,
                    type: "forgot"
                })

                await sendMail(
                    {
                        to: email,
                        subject: `${process?.env?.TITLE} Forgot Verification Code`,
                        content: `
                            your forgot verification code is ${secret}
                            `,
                    })

                res.status(200).json({
                    status: 200,
                    message: "Forgot Otp Sented",
                    data: response?.email
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Please Enter Correct Email",
                })
            }
        } catch (err: any) {
            if (err?.status) {
                res.status(err.status).json(err);
            } else {
                res.status(500).json({
                    status: 500,
                    message: err,
                });
            }
        }
    }

    async forgotVerify(req: Request, res: Response) {
        if (req?.body?.password?.length >= 8) {
            try {
                const existing = await this.repo.findByEmail(req?.body?.email);

                if (existing) {
                    const response = await this.repo.getTemp({
                        email: req?.body?.email?.toLowerCase?.(),
                        secret: req?.body?.OTP,
                        type: "forgot"
                    })

                    if (response) {
                        const password = await bcrypt?.hash(req?.body?.password, 10)

                        await this.repo.updatePassword({
                            email: req?.body?.email,
                            password
                        })

                        res?.status(200).json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        res?.status(422).json({
                            status: 422,
                            message: "Wrong Verification"
                        })
                    }
                } else {
                    res.status(404).json({
                        status: 404,
                        message: "Please Enter Valid Email",
                    })
                }
            } catch (err: any) {
                if (err?.status) {
                    res.status(err.status).json(err);
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: 'Password Should Minimum 8 Length',
            });
        }
    }

    async updatePassword(req: Request, res: Response) {
        const userId: string = typeof req?.query?.userId == 'string' ? req?.query?.userId : ''

        if (req?.body?.password?.length >= 8 &&
            req?.body?.newPassword?.length >= 8) {
            try {
                const existing = await this.repo.getUser(userId);

                const match = await bcrypt.compare(req?.body?.password, existing?.password)

                if (match) {
                    const password = await bcrypt?.hash(req?.body?.newPassword, 10)

                    await this.repo.updatePassword({
                        email: existing?.email,
                        password
                    })

                    res?.status(200).json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    res.status(422).json({
                        status: 422,
                        message: "Please Enter Correct Password",
                    })
                }
            } catch (err: any) {
                if (err?.status) {
                    res.status(err.status).json(err);
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: 'Password Should Minimum 8 Length',
            });
        }
    }

    async updateDetails(req: Request, res: Response) {
        const userId: string = typeof req?.query?.userId == 'string' ? req?.query?.userId : ''

        const { password, ...details } = req?.body

        if (password?.length >= 8) {
            try {
                const existing = await this.repo.getUser(userId);

                const match = await bcrypt.compare(password, existing?.password)

                if (match) {
                    await this.repo.updateDetails({
                        _id: existing?._id,
                        ...details
                    })

                    res?.status(200).json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    res.status(422).json({
                        status: 422,
                        message: "Please Enter Correct Password",
                    })
                }
            } catch (err: any) {
                if (err?.status) {
                    res.status(err.status).json(err);
                } else {
                    res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
            }
        } else {
            res.status(422).json({
                status: 422,
                message: 'Password Should Minimum 8 Length',
            });
        }
    }
}

export default Account