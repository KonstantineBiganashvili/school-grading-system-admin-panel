import { ref, get, child } from 'firebase/database';
import { db } from '../../firebase';

export const getRoles = async () => {
  try {
    const roles = await (await get(child(ref(db), `Roles`))).val();

    return roles;
  } catch (error) {
    console.error(error);
  }
};
