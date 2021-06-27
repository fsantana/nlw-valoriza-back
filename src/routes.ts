import { Router } from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { CreateTagController } from "./controllers/tag/CreateTagController";
import { ListTagController } from "./controllers/tag/ListTagController";
import { CreateComplimentController } from "./controllers/compliment/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controllers/compliment/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/compliment/ListUserReceiveComplimentsController";

const router = Router()

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const createTagController = new CreateTagController();
const listTagController = new ListTagController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

router.post('/login', authenticateUserController.handle);
router.post('/users', ensureAuthenticated, ensureAdmin,createUserController.handle);
router.get('/users', listUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get('/tags', ensureAuthenticated, listTagController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);
router.get('/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle);

export { router }