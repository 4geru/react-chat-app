import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import { auth } from './firebase';
import firebase from 'firebase/app';

const Container = styled.div`
    font-family: serif;
    color: dimgray;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
`

const Span = styled.span`
    cursor: pointer;
`

const Login = ({ history }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            user && history.push("/");
        })

        return unSub
    }, [history])

    const twitterLogin = () => {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().languageCode = 'ja';
        firebase.auth().signInWithPopup(provider)
    }

    const googleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'ja';
        firebase.auth().signInWithPopup(provider)
    }

    return (
        <Container>
            <h1>
                { isLogin ? 'Login' : 'Register' }
            </h1>

            <br />
            <FormControl>
                <TextField
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="email"
                    label="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </FormControl>
            <br />
            <FormControl>
                <TextField
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="password"
                    label="password"
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </FormControl>
            <br />
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={
                    isLogin
                        ? async () => {
                                try {
                                    await auth.signInWithEmailAndPassword(email, password);
                                    history.push('/')
                                } catch (error) {
                                    alert(error.message)
                                }
                            }
                        : async () => {
                                try {
                                    await auth.createUserWithEmailAndPassword(email, password);
                                    history.push('/')
                                } catch (error) {
                                    alert(error.message)
                                }
                        }
                }
            >
                { isLogin ? 'Login' : 'Register' }
            </Button>
            {
                isLogin && <>
                    <Button onClick={twitterLogin}>
                        Login with Twitter
                    </Button>
                    <Button onClick={googleLogin}>
                        Login with Google
                    </Button>
                </>
            }
            <Typography align="center">
                <Span onClick={() => setIsLogin(!isLogin)} >
                    {isLogin ? '新しいアカウントを作成' : 'ログイン'}
                </Span>
            </Typography>
        </Container>
    )
}

export default Login;