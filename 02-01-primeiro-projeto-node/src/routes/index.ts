import { json, Router } from 'express';
import appointmentsRouter from './appointments.routes';

const router: Router = Router();

router.use(json());
router.use('/appointments', appointmentsRouter);

export default router;
