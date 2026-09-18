"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/protected", auth_middleware_1.protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route accessed",
        data: {
            user: req.user,
        },
    });
});
router.get("/admin", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("ADMIN"), (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin route accessed",
    });
});
exports.default = router;
//# sourceMappingURL=test.routes.js.map