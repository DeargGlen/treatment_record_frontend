/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FC, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Card,
  CardContent,
  CardHeader,
  Button,
  Container,
} from '@mui/material';
import AlertMessage from 'components/molecules/AlertMessage';
import { userInfoUpdate } from 'apis/users';
import { UserInfoUpdateParams } from 'interfaces/index';
import { AuthContext } from 'App';
import Cookies from 'js-cookie';

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

const UserSettings: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>(currentUser?.email ?? '-');
  const [name, setName] = useState<string>(currentUser?.name ?? '-');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: UserInfoUpdateParams = {
      email: email ?? undefined,
      password: password ?? undefined,
      passwordConfirmation: passwordConfirmation ?? undefined,
      name: name ?? undefined,
    };

    userInfoUpdate(params)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          Cookies.set('_access_token', res.headers['access-token']);
          Cookies.set('_client', res.headers.client);
          Cookies.set('_uid', res.headers.uid);
          setCurrentUser(res.data.data);
          navigate('/individuals');

          console.log('Changed successfully!');
        } else {
          setAlertMessageOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlertMessageOpen(true);
      });
  };

  return (
    <>
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ユーザー情報の更新" />
            <CardContent>
              <TextField
                variant="outlined"
                fullWidth
                required
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
                fullWidth
                required
                label="パスワード"
                type="password"
                value={password}
                margin="dense"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                variant="outlined"
                fullWidth
                required
                label="パスワードの確認"
                type="password"
                value={passwordConfirmation}
                margin="dense"
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
                  !!(!email || !password || !passwordConfirmation || !name)
                }
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                更新
              </Button>
            </CardContent>
          </Card>
        </form>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="エラーが発生しました"
        />
      </Container>
    </>
  );
};

export default UserSettings;
