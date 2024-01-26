const express = require('express');
const app = express();
const isLogined = require("./../validation/isLogined");
const validation = require("./../validation/validateOrderType"); // օրինակ
const carController = require("./../controllers/carsController"); // օրինակ

const router = express.Router();


router.post("/", isLogined, validation, carController.createCar);  // ավելացնել cars.json զանգվածի մեջ  ավտոմեքենա
router.get("/", carController.getCars); // ստանալ բոլոր ավտոմեքենաները
router.put("/:id", isLogined, validation, carController.updateCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:id", isLogined, carController.deleteCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

module.exports = router;
