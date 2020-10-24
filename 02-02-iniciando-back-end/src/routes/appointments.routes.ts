import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter: Router = Router();
const appointmentsRepository: AppointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    // Recebimento e transformação de dados
    const { provider, date } = request.body;
    const parsedDate: Date = parseISO(date);

    // Regra e lógica de negócio dentro de um Service
    const createAppointment: CreateAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    // Executamos o service e temos um retorno
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    // Rota tem uma preocupação: receber dados, passar os dados para um outro
    // arquivo responsável e retornar uma resposta
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentsRouter;
