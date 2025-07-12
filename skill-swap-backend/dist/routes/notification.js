"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const notificationController_1 = require("../controllers/notificationController");
const router = express.Router();
// All routes require authentication
router.use(passport.authenticate('jwt', { session: false }));
// Get user's notifications
router.get('/', notificationController_1.getNotifications);
// Get unread count
router.get('/unread-count', notificationController_1.getUnreadCount);
// Mark notification as read
router.patch('/:notificationId/read', notificationController_1.markAsRead);
// Mark all notifications as read
router.patch('/mark-all-read', notificationController_1.markAllAsRead);
// Delete notification
router.delete('/:notificationId', notificationController_1.deleteNotification);
exports.default = router;
