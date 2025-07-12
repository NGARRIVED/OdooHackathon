"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadCount = exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// Get user's notifications
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 20, unreadOnly = false } = req.query;
        const query = { recipient: userId };
        if (unreadOnly === 'true') {
            query.read = false;
        }
        const notifications = yield Notification_1.default.find(query)
            .populate('sender', 'name email profilePhoto')
            .populate('relatedSwap')
            .sort({ createdAt: -1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const total = yield Notification_1.default.countDocuments(query);
        const unreadCount = yield Notification_1.default.countDocuments({
            recipient: userId,
            read: false
        });
        res.json({
            notifications,
            total,
            unreadCount,
            pages: Math.ceil(total / +limit),
            page: +page,
            limit: +limit
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getNotifications = getNotifications;
// Mark notification as read
const markAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { notificationId } = req.params;
        const notification = yield Notification_1.default.findOneAndUpdate({ _id: notificationId, recipient: userId }, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json(notification);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.markAsRead = markAsRead;
// Mark all notifications as read
const markAllAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        yield Notification_1.default.updateMany({ recipient: userId, read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.markAllAsRead = markAllAsRead;
// Delete notification
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { notificationId } = req.params;
        const notification = yield Notification_1.default.findOneAndDelete({
            _id: notificationId,
            recipient: userId
        });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.deleteNotification = deleteNotification;
// Get unread count
const getUnreadCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const unreadCount = yield Notification_1.default.countDocuments({
            recipient: userId,
            read: false
        });
        res.json({ unreadCount });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getUnreadCount = getUnreadCount;
