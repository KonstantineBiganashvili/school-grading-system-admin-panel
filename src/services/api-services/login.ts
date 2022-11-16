import { LoginInfo } from '../../interfaces-types/auth';
import { compare } from 'bcryptjs';
import { ref, get, child } from 'firebase/database';
import { db } from '../../firebase';

export const login = async (loginInfo: LoginInfo) => {
  try {
    const user = await (
      await get(child(ref(db), `Users/${loginInfo.username}`))
    ).val();

    if (user) {
      const isSame = await compare(loginInfo.password, user.password);
      if (!isSame) {
        return { error: 'Invalid Credentials' };
      } else {
        delete user.password;
        return user;
      }
    } else {
      return { error: 'User Does Not Exist' };
    }
  } catch (error) {
    console.error(error);
  }
};
