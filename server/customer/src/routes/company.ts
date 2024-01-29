import { Router } from "express";
import Company from "../controllers/company";

const company = new Company()

const router = Router()

router.post("/insert", company?.insert?.bind(company))

export default router;