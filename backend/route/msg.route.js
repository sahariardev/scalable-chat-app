import express from "express";
import {getMessagesForConversation} from "../controller/msg.controller.js";

const route = express.Router();

route.get('/', getMessagesForConversation)

export default route;