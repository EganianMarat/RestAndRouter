const express = require('express');
const app = express();
const isLogined = require("./../validation/isLogined");
const validation = require("./../validation/validateOrderType") // օրինակ
const bikeController = require("./../controllers/bikesController") // օրինակ

const router = express.Router();

router.post("/", isLogined, validation, bikeController.createCar);  // ավելացնել bikes.json զանգվածի մեջ  ավտոմեքենա
router.get("/", bikeController.getCars); // ստանալ բոլոր ավտոմեքենաները
router.put("/:id", isLogined, validation, bikeController.updateCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:id", isLogined, bikeController.deleteCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

module.exports = router;