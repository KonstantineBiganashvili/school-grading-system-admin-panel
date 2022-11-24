import { RegisterInfo } from '../../interfaces-types/auth';
import { ref, get, child, set } from 'firebase/database';
import { db } from '../../firebase';
import { User } from '../../interfaces-types/user';

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

export const getUsersList = async (): Promise<User[] | void> => {
  try {
    const arrOfUsers: User[] = [];
    const result = await (await get(child(ref(db), 'Users'))).val();

    for (let key in result) {
      arrOfUsers.push(result[key]);
    }

    return arrOfUsers;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (username: string): Promise<void> => {
  try {
    await set(ref(db, `/Users/${username}`), null);
  } catch (error) {
    console.error(error);
  }
};

export const editUser = async (editedUser: User): Promise<void> => {
  try {
    await set(ref(db, `/Users/${editedUser.username}`), editedUser);
  } catch (error) {
    console.error(error);
  }
};
