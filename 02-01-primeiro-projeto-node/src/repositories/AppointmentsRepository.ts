import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment ?? null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

/**
 * Repository
 *
 * O Repository é um conceito introduzido no Data Mapper Pattern ou Repository Pattern
 * que consiste em uma ponte entre nossa aplicação e a fonte de dados, seja ela
 * um banco de dados, um arquivo físico ou qualquer outro meio de persistência
 * de dados da aplicação.
 * Essa implementação visa isolar a forma com que nos comunicamos com os dados,
 * abstraindo lógicas comuns de operações no banco.
 * Geralmente o Repository possui os métodos comuns de comunicação com uma
 * fonte de dados como listagem, busca, criação, edição, remoção, mas conforme a
 * aplicação cresce o desenvolvedor tende a encontrar outras operações repetitíveis e,
 * com isso, popula o repositório com mais funcionalidades.
 */
