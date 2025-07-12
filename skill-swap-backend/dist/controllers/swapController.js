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
exports.updateSwapStatus = exports.getMySwapRequestsPaginated = exports.getMySwapRequests = exports.createSwapRequest = void 0;
const SwapRequest_1 = __importDefault(require("../models/SwapRequest"));
const Notification_1 = __importDefault(require("../models/Notification"));
const User_1 = __importDefault(require("../models/User"));
const createSwapRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { toUser, offeredSkill, wantedSkill, message } = req.body;
        const fromUser = req.user._id;
        // Create the swap request
        const swap = yield SwapRequest_1.default.create({ fromUser, toUser, offeredSkill, wantedSkill, message });
        // Get sender's name for notification
        const sender = yield User_1.default.findById(fromUser).select('name');
        // Create notification for the recipient
        yield Notification_1.default.create({
            recipient: toUser,
            sender: fromUser,
            type: 'swap_request',
            title: 'New Skill Swap Request',
            message: `${(sender === null || sender === void 0 ? void 0 : sender.name) || 'Someone'} wants to exchange ${offeredSkill} for ${wantedSkill}`,
            relatedSwap: swap._id
        });
        res.status(201).json(swap);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.createSwapRequest = createSwapRequest;
const getMySwapRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const sent = yield SwapRequest_1.default.find({ fromUser: userId }).populate('toUser', 'name email profilePhoto');
        const received = yield SwapRequest_1.default.find({ toUser: userId }).populate('fromUser', 'name email profilePhoto');
        res.json({ sent, received });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getMySwapRequests = getMySwapRequests;
const getMySwapRequestsPaginated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, status } = req.query;
        const sentQuery = { fromUser: userId };
        const receivedQuery = { toUser: userId };
        if (status) {
            sentQuery.status = status;
            receivedQuery.status = status;
        }
        const sent = yield SwapRequest_1.default.find(sentQuery)
            .populate('toUser', 'name email profilePhoto')
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const received = yield SwapRequest_1.default.find(receivedQuery)
            .populate('fromUser', 'name email profilePhoto')
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const sentTotal = yield SwapRequest_1.default.countDocuments(sentQuery);
        const receivedTotal = yield SwapRequest_1.default.countDocuments(receivedQuery);
        res.json({
            sent, sentTotal, sentPages: Math.ceil(sentTotal / +limit),
            received, receivedTotal, receivedPages: Math.ceil(receivedTotal / +limit),
            page: +page, limit: +limit
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getMySwapRequestsPaginated = getMySwapRequestsPaginated;
const updateSwapStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body; // 'accepted' or 'rejected'
        const userId = req.user._id;
        const swap = yield SwapRequest_1.default.findOneAndUpdate({ _id: req.params.id, toUser: userId }, { status }, { new: true }).populate('fromUser', 'name');
        if (!swap)
            return res.status(404).json({ message: 'Swap request not found' });
        // Get responder's name for notification
        const responder = yield User_1.default.findById(userId).select('name');
        // Create notification for the original requester
        const notificationType = status === 'accepted' ? 'swap_accepted' : 'swap_rejected';
        const notificationTitle = status === 'accepted' ? 'Swap Request Accepted' : 'Swap Request Rejected';
        const notificationMessage = status === 'accepted'
            ? `${(responder === null || responder === void 0 ? void 0 : responder.name) || 'Someone'} accepted your swap request for ${swap.offeredSkill} ↔ ${swap.wantedSkill}`
            : `${(responder === null || responder === void 0 ? void 0 : responder.name) || 'Someone'} declined your swap request for ${swap.offeredSkill} ↔ ${swap.wantedSkill}`;
        yield Notification_1.default.create({
            recipient: swap.fromUser._id,
            sender: userId,
            type: notificationType,
            title: notificationTitle,
            message: notificationMessage,
            relatedSwap: swap._id
        });
        res.json(swap);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.updateSwapStatus = updateSwapStatus;
