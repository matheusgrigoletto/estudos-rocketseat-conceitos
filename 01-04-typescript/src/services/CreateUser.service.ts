interface TechObject {
  title: string;
  experience: number;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string | number;
  techs?: Array<string | TechObject>;
}

/**
 * Cria usuário
 * @param CreateUserData name, email, password 
 */
export default function createUser({ name, email, password, techs = [] }: CreateUserData) {
  const user = {
    name,
    email,
    password,
    techs,
  };

  return user;
}