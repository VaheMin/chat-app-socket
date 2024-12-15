import { createUseStyles } from 'react-jss';
import { colors } from './constants/constants';
import SignIn from './components/SignIn/SignIn';
import { IReduxState } from './types';
import { getUserData } from './store/slices/main/selectors';
import { useSelector } from 'react-redux';
import Chat from './components/Chat/Chat';

const useStyles = createUseStyles({
  root: {
    backgroundColor: colors.BACKGROUND,
    height: '100vh',
    width: '100%',
  },
});

const mainAppSelector = (state: IReduxState) => ({
  user: getUserData(state),
});

function App() {
  const classes = useStyles();

  const { user } = useSelector(mainAppSelector);

  return <div className={classes.root}>{user.token && user.name ? <Chat /> : <SignIn />}</div>;
}

export default App;
