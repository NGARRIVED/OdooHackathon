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
exports.uploadProfilePhoto = exports.listPublicProfiles = exports.getPublicProfile = exports.setProfileVisibility = exports.updateProfile = exports.getMe = void 0;
const User_1 = __importDefault(require("../models/User"));
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getMe = getMe;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const user = yield User_1.default.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.updateProfile = updateProfile;
const setProfileVisibility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isPublic } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(req.user._id, { isPublic }, { new: true }).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.setProfileVisibility = setProfileVisibility;
const getPublicProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.params.id, isPublic: true }).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found or not public' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getPublicProfile = getPublicProfile;
const listPublicProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, name, skill, location } = req.query;
        const query = { isPublic: true };
        if (name)
            query.name = { $regex: name, $options: 'i' };
        if (location)
            query.location = { $regex: location, $options: 'i' };
        if (skill)
            query.$or = [
                { skillsOffered: { $regex: skill, $options: 'i' } },
                { skillsWanted: { $regex: skill, $options: 'i' } },
            ];
        const users = yield User_1.default.find(query)
            .select('-password')
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const total = yield User_1.default.countDocuments(query);
        res.json({ users, total, page: +page, pages: Math.ceil(total / +limit) });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.listPublicProfiles = listPublicProfiles;
const uploadProfilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            return res.status(400).json({ message: 'No file uploaded' });
        const user = yield User_1.default.findByIdAndUpdate(req.user._id, { profilePhoto: `/uploads/${req.file.filename}` }, { new: true }).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.uploadProfilePhoto = uploadProfilePhoto;
