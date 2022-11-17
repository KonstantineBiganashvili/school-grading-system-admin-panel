import { RegisterInfo } from '../../interfaces-types/auth';
import { ref, get, child } from 'firebase/database';
import { db } from '../../firebase';

export const checkUser = async (inputInfo: RegisterInfo) => {
  try {
    const user = await (
      await get(child(ref(db), `Users/${inputInfo.username}`))
    ).val();

    if (user) {
      return {
        error: 'User Already Exists',
      };
    }
  } catch (error) {
    console.error(error);
  }
};
