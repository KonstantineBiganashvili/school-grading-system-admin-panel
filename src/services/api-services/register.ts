import { RegisterInfo } from '../../interfaces/auth';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { set, ref } from 'firebase/database';
import { db } from '../../firebase';

export const login = async (registerInfo: RegisterInfo) => {
  const hashedPassword = await hash(registerInfo.password, 12);

  try {
    await set(ref(db, `/Users/${registerInfo.username}`), {
      id: uuid(),
      role_id: registerInfo.role_id,
      username: registerInfo.username,
      password: hashedPassword,
      first_name: registerInfo.first_name,
      last_name: registerInfo.last_name,
    });
  } catch (error) {
    console.error(error);
  }
};
