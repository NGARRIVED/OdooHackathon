"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const userController_1 = require("../controllers/userController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const user_1 = require("../validations/user");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = (0, express_1.Router)();
// Protected routes
router.get('/me', passport.authenticate('jwt', { session: false }), userController_1.getMe);
router.put('/me', passport.authenticate('jwt', { session: false }), (0, validate_1.default)(user_1.updateProfileSchema), userController_1.updateProfile);
router.patch('/me/visibility', passport.authenticate('jwt', { session: false }), (0, validate_1.default)(user_1.setProfileVisibilitySchema), userController_1.setProfileVisibility);
router.post('/me/photo', passport.authenticate('jwt', { session: false }), upload_1.default.single('photo'), userController_1.uploadProfilePhoto);
// Public profile
router.get('/public', userController_1.listPublicProfiles);
router.get('/:id', userController_1.getPublicProfile);
exports.default = router;
