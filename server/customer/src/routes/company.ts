import { Router } from "express";
import Company from "../controllers/company";

const company = new Company()

const router = Router()

router.post("/", company?.insert?.bind(company))

router.put("/", company?.update?.bind(company))

router.delete("/", company?.delete?.bind(company))

router.get("/", company?.getAll?.bind(company))

export default router;