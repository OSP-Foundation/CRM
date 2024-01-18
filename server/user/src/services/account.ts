import mongoose from "mongoose";
import { Temp, User } from "../models";
import axios from "axios";

class AccountService {
    private user: typeof User;
    private temp: typeof Temp;

    constructor() {
        this.user = User;
        this.temp = Temp;
    }

    findByEmail(email: string) {
        return new Promise<{
            _id: string,
            name: string,
            email: string,
            password: string
        } | null>(async (resolve, reject) => {
            try {
                const res = await this.user.findOne({
                    email
                })

                if (res) {
                    resolve({
                        _id: res?._id?.toHexString(),
                        name: res?.name,
                        email: res?.email,
                        password: res?.password
                    })
                } else {
                    resolve(null)
                }
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }

    createTemp(details: {
        email: string,
        secret?: string,
        type: string
    }) {
        return new Promise<{
            _id: mongoose.Types.ObjectId,
            email: string
        }>(async (resolve, reject) => {
            try {
                const res = await this.temp.create(details);

                resolve({
                    email: res?.email,
                    _id: res?._id
                })
            } catch (err: any) {
                if (err?.code == 11000) {
                    const res = await this.temp.findOneWithTypeAndUpdate({
                        email: details?.email,
                        type: details?.type
                    }, {
                        $set: {
                            secret: details?.secret ? details?.secret : null,
                            expireAt: new Date()
                        }
                    })?.catch((err: any) => {
                        reject(err?._message || 'something went wrong')
                    })

                    if (res?._id &&
                        mongoose?.Types?.ObjectId?.isValid(res?._id)
                    ) {
                        resolve({
                            _id: res?._id,
                            email: res?.email
                        })
                    }

                } else if (err?.errors?.email?.properties?.message) {
                    reject({
                        status: 422,
                        message: err?.errors?.email?.properties?.message
                    })
                } else {
                    reject(err?._message || 'something went wrong')
                }
            }
        })
    }

    getTemp(details: {
        email: string,
        secret?: string,
        type: string
    }) {
        return new Promise<{
            email: string,
            secret?: string,
            type?: string
        } | null>(async (resolve, reject) => {
            try {
                const res = await this.temp.findOneWithType(details)

                resolve(res)
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }

    insertUser(details: {
        email: string,
        password: string,
        name: string
    }) {
        return new Promise<string>(async (resolve, reject) => {
            let res: {
                _id: mongoose.Types.ObjectId
            } | null = null;

            try {
                res = await this.user.create(details);
            } catch (err: any) {
                if (err?.code === 11000) {
                    reject({
                        status: 422,
                        message: "Already Registered Email",
                    });
                } else {
                    reject(err?._message || 'Something Went Wrong');
                }
            } finally {
                if (res) {
                    await this.temp.deleteOneWithType({
                        email: details?.email,
                        type: 'register'
                    })
                        .catch((err: any) => {
                            console.log("Temp Delete Error : ", err);
                        });

                    resolve(res?._id?.toHexString());
                }
            }
        })
    }

    googleVerify(token: string) {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                resolve(res?.data?.email?.toLowerCase?.())
            } catch (err: any) {
                if (err?.response?.status) {
                    reject({
                        status: err?.response?.status,
                        message: err?.response?.data?.error || "Failed to verify google"
                    })
                } else {
                    reject("Failed to verify google")
                }
            }
        })
    }

    updatePassword(details: {
        password: string,
        email: string
    }) {
        return new Promise<void>(async (resolve, reject) => {
            let res: boolean = false;

            try {
                await this.user.updateOne({
                    email: details?.email
                }, {
                    $set: {
                        "password": details?.password
                    }
                })

                res = true
            } catch (err: any) {
                reject(err?._message)
            } finally {
                if (res) {
                    await this.temp.deleteOneWithType({
                        email: details?.email,
                        type: 'forgot'
                    })
                        .catch((err: any) => {
                            console.log("Temp Delete Error : ", err);
                        });

                    resolve()
                }
            }
        })
    }

    updateDetails({ _id, ...details }: {
        _id: string,
        email?: string,
        name?: string,
    }) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let user = await this.user.findOne({ _id: new mongoose.Types.ObjectId(_id) })

                if (user) {
                    if (details?.email && details?.email !== user?.email) {
                        user.email = details?.email
                    }

                    if (details?.name) {
                        user.name = details?.name
                    }

                    await user?.save()

                    resolve()
                } else {
                    reject({
                        status: 404,
                        message: "Not Found"
                    })
                }
            } catch (err: any) {
                if (err?.code == 11000) {
                    reject({
                        status: 422,
                        message: "Email already used"
                    })
                } else {
                    reject(err?._message)
                }
            }
        })
    }

    getUser(_id: string) {
        return new Promise<{
            _id: string,
            name: string,
            email: string,
            password: string
        }>(async (resolve, reject) => {
            try {
                const res = await this.user.findOne({
                    _id: new mongoose.Types.ObjectId(_id)
                })

                if (res) {
                    resolve({
                        _id: res?._id?.toHexString(),
                        email: res?.email,
                        name: res?.name,
                        password: res?.password
                    })
                } else {
                    reject({
                        status: 404,
                        message: "Not Found"
                    })
                }
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default AccountService;