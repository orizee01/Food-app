import { Router }   from 'express' ;
import UsersRouter from './../routes/users_routes' ;
// import { apiMessage, Response } from '../utilis/constants';
const router = Router();

router.use("/user", UsersRouter);
// router.use((req, res) => {
//     return Response.errorResponse(req, res, {
//       status: 404,
//       message: apiMessage.NOT_FOUND_API,
//     });
//   });
//   router.use((req, res) => {
//     return Response.errorResponse(req, res, {
//       status: 500,
//       message: apiMessage.INTERNAL_SERVER_ERROR,
//     });
//   });
  export default router;
  