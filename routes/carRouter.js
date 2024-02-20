import {Router} from 'express';
import isLogined from "./../validation/isLogined.js";
import validation from "./../validation/validateOrderType.js"; // օրինակ
import carController from "./../controllers/carsController.js"; // օրինակ
import requests from './../controllers/requests.js';
const router = Router();

router.post("/", requests, isLogined, validation, carController.createCar);  // ավելացնել cars.json զանգվածի մեջ  ավտոմեքենա
router.get("/createform", carController.createForm); // ստանալ բոլոր ավտոմեքենաները
router.get("/", carController.getCars); // ստանալ բոլոր ավտոմեքենաները
router.put("/:slat", requests, isLogined, validation, carController.updateCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:slat", isLogined, carController.deleteCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

export default router;
