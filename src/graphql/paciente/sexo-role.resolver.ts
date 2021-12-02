import { SexoRole } from "../../entities/paciente.entity";

export const sexoRoleResolver: Record<keyof typeof SexoRole, any> = {
  MASCULINO: 'M',
  FEMININO: 'F',
  OUTRO: 'O',
};