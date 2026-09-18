import { Router } from "express";

import {
  dashboard,
  getUsers,
  getUser,
  changeUserRole,
  getArtworks,
  changeArtworkStatus,
  getArtists,
  getInquiries,
  changeInquiryStatus,
  getInquiry,
  getArtist,
  getArtwork,
} from "./admin.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

import {
  validate,
} from "../../middleware/validate.middleware";

import {
  getUsersQuerySchema,
  updateUserRoleSchema,
  getAdminArtworksQuerySchema,
  updateArtworkStatusSchema,
  getAdminInquiriesQuerySchema,
  updateInquiryStatusSchema,
  getAdminInquiryByIdSchema,
  getAdminArtistByIdSchema,
  getAdminArtworkByIdSchema,
 
} from "./admin.validation";

const router = Router();

router.use(
  protect,
  authorize("ADMIN")
);

router.get(
  "/dashboard",
  dashboard
);

router.get(
  "/users",
  validate(getUsersQuerySchema),
  getUsers
);

router.get(
  "/users/:id",
  getUser
);

router.patch(
  "/users/:id/role",
  validate(updateUserRoleSchema),
  changeUserRole
);

router.get(
  "/artists",
  getArtists
);


router.get(
  "/artists/:id",
  validate(getAdminArtistByIdSchema),
  getArtist
);

router.get(
  "/artworks",
  validate(
    getAdminArtworksQuerySchema
  ),
  getArtworks
);
  
router.get(
  "/artworks/:id",
  validate(getAdminArtworkByIdSchema),
  getArtwork
);

router.patch(
  "/artworks/:id/status",
  validate(
    updateArtworkStatusSchema
  ),
  changeArtworkStatus
);

router.get(
    "/inquiries",
    validate(
      getAdminInquiriesQuerySchema
    ),
    getInquiries
  );
  
  router.get(
    "/inquiries/:id",
    validate(
      getAdminInquiryByIdSchema
    ),
    getInquiry
  );

  router.patch(
    "/inquiries/:id/status",
    validate(
      updateInquiryStatusSchema
    ),
    changeInquiryStatus
  );
  
  
export default router;