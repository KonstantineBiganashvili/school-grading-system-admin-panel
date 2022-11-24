import { ref, get, child, set } from 'firebase/database';
import { db } from '../../firebase';
import { Subject } from '../../interfaces-types/subject';

export const getSubjects = async (): Promise<Subject[] | undefined> => {
  try {
    const roles = await (await get(child(ref(db), `Subjects`))).val();

    return roles;
  } catch (error) {
    console.error(error);
  }
};

export const addSubject = async (subject: Subject) => {
  try {
    await set(ref(db, `Subjects/${subject.id - 1}`), {
      ...subject,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteSubject = async (index: number) => {
  try {
    await set(ref(db, `Subjects/${index}`), null);
  } catch (error) {
    console.error(error);
  }
};

export const editSubject = async (index: number, subject: Subject) => {
  try {
    await set(ref(db, `Subjects/${index}`), subject);
  } catch (error) {
    console.error(error);
  }
};
