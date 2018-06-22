"use strict";

const router = require("express").Router();
const controller = require("./../controllers/controller");


/*router.param("id", controller.params);*/

router.route("/registro")
    .post(controller.post);

router.route("/login")
    .post(controller.login);

router.route("/logout")
    .post(controller.logout);

/*
router.route("/:id")
    .get(controller.get)
    .put(controller.put)
    .delete(controller.delete);
    */
router.route("/test")
    .post(controller.test)
    .get(controller.getuno);

module.exports = router;