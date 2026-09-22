import { Router } from "express";
import * as userService from "./user.service.js";
const router = Router();
router.get("/", userService.users);

router.get("/search", userService.search);

router.get("/:id/profile", userService.profile);

router.patch("/:id", userService.update);

router.delete("/:id", userService.deleteUser);
export default router;
