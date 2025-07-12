"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const swapController_1 = require("../controllers/swapController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const swap_1 = require("../validations/swap");
const router = (0, express_1.Router)();
router.post('/', passport.authenticate('jwt', { session: false }), (0, validate_1.default)(swap_1.createSwapSchema), swapController_1.createSwapRequest);
router.get('/mine', passport.authenticate('jwt', { session: false }), swapController_1.getMySwapRequests);
router.get('/mine/paginated', passport.authenticate('jwt', { session: false }), swapController_1.getMySwapRequestsPaginated);
router.patch('/:id/status', passport.authenticate('jwt', { session: false }), (0, validate_1.default)(swap_1.updateSwapStatusSchema), swapController_1.updateSwapStatus);
exports.default = router;
