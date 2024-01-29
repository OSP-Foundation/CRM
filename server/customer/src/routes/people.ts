import { Router } from "express";
import People from "../controllers/people";

const people = new People();

const router = Router()

router.post("/insert", people?.insert?.bind(people))

router.get("/all", people?.getAll?.bind(people))

export default router;