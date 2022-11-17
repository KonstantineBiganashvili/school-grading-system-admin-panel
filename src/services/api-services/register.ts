import { RegisterInfo } from '../../interfaces-types/auth';
import { hash } from 'bcryptjs';
import { set, ref } from 'firebase/database';
import { db } from '../../firebase';

export const register = async (registerInfo: RegisterInfo) => {
  const hashedPassword = await hash(registerInfo.password, 12);

  try {
    await set(ref(db, `/Users/${registerInfo.username}`), {
      id: registerInfo.id,
      role_id: registerInfo.role_id,
      username: registerInfo.username,
      password: hashedPassword,
      first_name: registerInfo.first_name,
      last_name: registerInfo.last_name,
      subjects: registerInfo.subjects,
    });
  } catch (error) {
    console.error(error);
  }
};
