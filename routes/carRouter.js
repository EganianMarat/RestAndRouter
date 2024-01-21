const express = require('express');
const fs = require("fs");
const dataBase = './db/cars.json';
const app = express();
const validation = require("./../validation/validateOrderType"); // օրինակ
const carController = require("./../controllers/carsController"); // օրինակ

const router = express.Router();


router.post("/", validation, carController.createCar);  // ավելացնել cars.json զանգվածի մեջ  ավտոմեքենա
router.get("/", carController.getCars); // ստանալ բոլոր ավտոմեքենաները
router.put("/:id", validation, carController.updateCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:id", carController.deleteCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

module.exports = router;
