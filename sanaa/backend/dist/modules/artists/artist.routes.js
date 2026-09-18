"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artist_controller_1 = require("./artist.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const artist_validation_1 = require("./artist.validation");
const router = (0, express_1.Router)();
router.post("/onboard", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("USER"), (0, validate_middleware_1.validate)(artist_validation_1.onboardArtistSchema), artist_controller_1.onboard);
router.get("/me", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("ARTIST"), artist_controller_1.getMyArtistProfile);
router.patch("/me", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("ARTIST"), (0, validate_middleware_1.validate)(artist_validation_1.updateArtistSchema), artist_controller_1.updateMyArtistProfile);
exports.default = router;
//# sourceMappingURL=artist.routes.js.map