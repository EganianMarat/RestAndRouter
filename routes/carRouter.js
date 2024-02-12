import {Router} from 'express';
import isLogined from "./../validation/isLogined.js";
import validation from "./../validation/validateOrderType.js"; // օրինակ
import carController from "./../controllers/carsController.js"; // օրինակ
const router = Router();

router.post("/", isLogined, validation, carController.createCar);  // ավելացնել cars.json զանգվածի մեջ  ավտոմեքենա
router.get("/", carController.getCars); // ստանալ բոլոր ավտոմեքենաները
router.put("/:slat", isLogined, validation, carController.updateCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:slat", isLogined, carController.deleteCar);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

export default router;
