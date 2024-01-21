const express = require('express');
const fs = require("fs");
const dataBase = './db/bikes.json';
const app = express();
const validation = require("./../validation/validateOrderType") // օրինակ
const bikeController = require("./../controllers/bikesController") // օրինակ

const router = express.Router();

router.post("/", validation, bikeController.createCar);  // ավելացնել bikes.json զանգվածի մեջ  ավտոմեքենա
router.get("/", bikeController.getCars); // ստանալ բոլոր ավտոմեքենաները
router.put("/:id", validation, bikeController.updateCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:id", bikeController.deleteCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

module.exports = router;