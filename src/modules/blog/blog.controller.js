import { Router } from "express";
import * as blogService from "./blog.service.js";
const router = Router();
router.post("/", blogService.create);
router.get("/", blogService.blogs);
export default router;
