"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.protect, user_controller_1.getMe);
router.patch("/me", auth_middleware_1.protect, (0, validate_middleware_1.validate)(user_validation_1.updateUserSchema), user_controller_1.updateMe);
exports.default = router;
//# sourceMappingURL=user.routes.js.map