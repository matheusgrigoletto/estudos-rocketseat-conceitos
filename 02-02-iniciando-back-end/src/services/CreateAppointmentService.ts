import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Recebimento das informações
 * Tratativa de erros/exceções
 * Acesso ao repositório
 */

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate: Date = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked.');
    }

    const appointment: Appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

/**
 * Service
 * O Service é um conceito introduzido no Service Pattern. Ele tem como objetivo
 * abstrair regras de negócio das rotas, além de tornar nosso código mais reutilizável.
 * No contexto da nossa jornada, essa implementação visa reduzir a complexidade
 * das rotas da nossa aplicação e deixá-las responsáveis apenas pelo que realmente
 * devem fazer: receber uma requisição, repassar os dados da requisição a outro
 * arquivo e devolver uma resposta.
 * O Service deve ter um nome descritivo (ex.: updateDeliveryManProfileService)
 * e **sempre** possuir apenas **um** método (ex.: execute()). Além disso, caso
 * outra rota ou arquivo precise executar essa  mesma ação, basta chamar e executar
 * esse Service, obedecedo assim a outro importante princípio: DRY (Don't Repeat Yourself).
 */
