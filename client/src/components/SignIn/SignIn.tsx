import { createUseStyles } from 'react-jss';
import { SingInStatuses, colors } from '../../constants/constants';
import { useState } from 'react';
import { IUserAuthPostData, IUserData } from '../../types';
import { userAuth } from '../../api/user/userAuth';
import { dispatch } from '../../store/external';
import mainSlice from '../../store/slices/main';

const useStyles = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: 'white',
    padding: '34px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderRadius: '12px',
  },
  input: {
    border: `1px solid ${colors.THIRD}`,
    width: '280px',
    padding: '8px',
    borderRadius: '10px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: colors.SECONDARY,
    color: colors.BACKGROUND,
    padding: '6px 12px',
    width: '144px',
    borderRadius: '50px',
    transition: '.3s',
    fontSize: '16px',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(.95)',
    },
  },
  error: {
    color: 'red',
    fontSize: '12px',
    textAlign: 'center',
  },
});

const SignIn = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState<IUserAuthPostData>({ name: '', password: '' });

  const [signInError, setSignInError] = useState(false);

  const handleUserSignIn = async () => {
    setSignInError(false);
    const userInfo: IUserData = await userAuth(userData);

    if (userInfo.status === SingInStatuses.SUCCESS) {
      dispatch(
        mainSlice.actions.setUserInfo({
          name: userInfo.name,
          token: userInfo.token,
        })
      );
    } else {
      setSignInError(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <input className={classes.input} placeholder='Login' value={userData.name} onChange={(e: any) => setUserData({ ...userData, name: e.target.value })} />
        <input className={classes.input} placeholder='Password' type='password' value={userData.password} onChange={(e: any) => setUserData({ ...userData, password: e.target.value })} />
        <button className={classes.button} onClick={handleUserSignIn}>
          Sign in
        </button>
        {signInError && <p className={classes.error}>User credentials is not correct!</p>}
      </div>
    </div>
  );
};

export default SignIn;
