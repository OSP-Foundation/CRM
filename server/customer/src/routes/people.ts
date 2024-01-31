import { Router } from "express";
import People from "../controllers/people";

const people = new People();

const router = Router()

router.post("/", people?.insert?.bind(people))

router.put("/", people?.update?.bind(people))

router.delete("/", people?.delete?.bind(people))

router.get("/", people?.getAll?.bind(people))

export default router;