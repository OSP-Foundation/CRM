import { Router } from "express";
import Company from "../controllers/company";

const company = new Company()

const router = Router()

router.put("/update", company?.update?.bind(company))

router.get("/get", company?.get?.bind(company))

export default router;