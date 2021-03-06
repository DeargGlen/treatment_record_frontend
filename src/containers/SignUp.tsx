/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Card,
  CardContent,
  CardHeader,
  Button,
  Container,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import AlertMessage from 'components/molecules/AlertMessage';
import { signUp } from 'apis/users';
import { SignUpParams } from 'interfaces/index';

const useStyles = makeStyles(() => ({
  container: {},
  submitBtn: {
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    textAlign: 'center',
  },
  card: {},
}));

// サインアップ用ページ
const SignUp: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const confirmSuccessUrl = process.env.REACT_APP_CONFIRM_SUCCESS_URL ?? '';
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [alertMessageOpen2, setAlertMessageOpen2] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleToggle();

    const params: SignUpParams = {
      name,
      email,
      password,
      passwordConfirmation,
      confirmSuccessUrl,
    };

    signUp(params)
      .then((res) => {
        handleClose();

        if (res.status === 200) {
          navigate('/signup');
          // eslint-disable-next-line no-alert
          alert('メールを確認してアカウントを有効化してください');
        } else {
          setAlertMessageOpen(true);
        }
      })
      .catch((err) => {
        if (
          err.response.data.errors[0] ===
          'ログインもしくはアカウント登録してください。'
        ) {
          setAlertMessageOpen2(true);
        } else {
          setAlertMessageOpen(true);
        }
      });
  };

  return (
    <>
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ユーザー登録" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="名前"
                value={name}
                margin="dense"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="メールアドレス"
                value={email}
                margin="dense"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="パスワード"
                type="password"
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="パスワードの確認"
                type="password"
                value={passwordConfirmation}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={
                  !!(!name || !email || !password || !passwordConfirmation)
                }
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                登録
              </Button>
              <Link to="/signin">サインインへ</Link>
            </CardContent>
          </Card>
        </form>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="無効なメールアドレス/パスワードです"
        />
        <AlertMessage
          open={alertMessageOpen2}
          setOpen={setAlertMessageOpen2}
          severity="error"
          message="サインインしたユーザーのみがユーザーを追加できます"
        />
      </Container>
      <Backdrop sx={{ color: '#fff' }} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default SignUp;
