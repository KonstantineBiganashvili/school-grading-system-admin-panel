import { ref, get, child } from 'firebase/database';
import { db } from '../../firebase';

export const getSubjects = async () => {
  try {
    const roles = await (await get(child(ref(db), `Subjects`))).val();

    return roles;
  } catch (error) {
    console.error(error);
  }
};
