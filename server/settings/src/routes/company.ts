import { Router } from "express";
import Company from "../controllers/company";

const company = new Company()

const router = Router()

router.put("/", company?.update?.bind(company))

router.get("/", company?.get?.bind(company))

export default router;