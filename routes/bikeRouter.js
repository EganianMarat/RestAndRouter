import {Router} from 'express';
import isLogined from "./../validation/isLogined.js";
import validation from "./../validation/validateOrderType.js"; // օրինակ
import bikeController from "./../controllers/bikesController.js"; // օրինակ
const router = Router();

router.post("/", isLogined, validation, bikeController.createBike);  // ավելացնել bikes.json զանգվածի մեջ  ավտոմեքենա
router.get("/", bikeController.getBikes); // ստանալ բոլոր ավտոմեքենաները
router.put("/:slat", isLogined, validation, bikeController.updateBike);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի
router.delete("/:slat", isLogined, bikeController.deleteBike);  // փոփոխել ավտոմեքենայի ինֆորմացիան ըստ body_ի

export default router;