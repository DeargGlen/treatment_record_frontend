/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useContext, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { makeStyles } from '@mui/styles';
import {
  Container,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@mui/material';

import AuthContext from 'interfaces/context';
import AlertMessage from 'components/molecules/AlertMessage';
import { signIn } from 'apis/users';
import { SignInParams } from 'interfaces/index';

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
  box: {
    marginTop: '2rem',
  },
  link: {
    textDecoration: 'none',
  },
}));

const SignIn: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: SignInParams = {
      email,
      password,
    };
    signIn(params)
      .then((res) => {
        if (res.status === 200) {
          Cookies.set('_access_token', res.headers['access-token']);
          Cookies.set('_client', res.headers.client);
          Cookies.set('_uid', res.headers.uid);

          setIsSignedIn(true);
          setCurrentUser(res.data.data);

          navigate('/');
        } else {
          setAlertMessageOpen(true);
        }
      })
      .catch(() => {
        setAlertMessageOpen(true);
      });
  };

  return (
    <>
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ログイン" />
            <CardContent>
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
                placeholder="At least 6 characters"
                value={password}
                margin="dense"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={!!(!email || !password)}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                ログイン
              </Button>
            </CardContent>
          </Card>
        </form>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="メールアドレスまたはパスワードが間違っています"
        />
      </Container>
    </>
  );
};

export default SignIn;
