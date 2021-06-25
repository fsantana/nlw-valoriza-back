import { Router } from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserController } from "./controllers/ListUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ListTagController } from "./controllers/ListTagController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";

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