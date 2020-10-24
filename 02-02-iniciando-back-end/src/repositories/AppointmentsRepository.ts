import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    return findAppointment ?? null;
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
