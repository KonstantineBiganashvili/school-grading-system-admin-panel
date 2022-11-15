/* eslint-disable react-hooks/rules-of-hooks */
import { LoginInfo } from '../../interfaces/auth';
import { compare } from 'bcryptjs';
import { ref, get, child } from 'firebase/database';
import { db } from '../../firebase';
// import { useDispatch } from 'react-redux';
// import userSlice from '../../store/user-slice';

export const login = async (loginInfo: LoginInfo) => {
  // const dispatch = useDispatch();

  try {
    const user = await (
      await get(child(ref(db), `Users/${loginInfo.username}`))
    ).val();
    const isSame = await compare(loginInfo.password, user.password);
    if (isSame) {
      console.log(user);
      // Logic Here - Return user or something
      // dispatch(userSlice.actions.setUser(user.val()));
    }
  } catch (error) {
    console.error(error);
  }
};
