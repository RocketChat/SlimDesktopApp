import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { loginWithPassword, realTimeLoginWithAuthToken } from "../../util/login.util";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import rcLogo from "../ChatsList/Footer/logo.png";
import { getCurrentServer } from "../../util/server.util";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #2f343d;
`

const Form = styled.form`
    color: white;
    padding: 15px;
`

const Label = styled.label`
    font-size: ${(props: {fontSize: string}) => props.fontSize};
    font-weight: bold;
`

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
`

const FormInput = styled.input`
    width: 97%;
    height: 20px;
    margin: 10px 0;
    background: transparent;
    border: 1px solid #636363;
    padding: 5px;
    color: #FFF;
    outline:none;
`

const HorizontalLine = styled.div`
    display: block;
    width: 400px;
    height: 3px;
    background: #FFF;
    margin: 10px auto;
`

const LoginButton = styled.button`
    width: 100%;
    height: 30px;
    background-color: ${(props: {disabled: boolean}) => props.disabled ? `rgba(2, 117, 216, 0.4);` : `rgba(2, 117, 216, 1);`}
    border: none;
    color: white;
    font-weight: bold;
    &:hover {
        background-color: rgba(2, 117, 216, 0.6);
    }
`

const Link = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: rgb(2, 117, 216);
    margin: 5px;

    &:hover {
        text-decoration: none;
    }
`

const RCLogo = styled.img`
    height: 50px;
    width: 250px;
    display: block;
    margin: auto;
    margin-bottom: 20px;
    padding: 15px;
`

const WarningItem = styled.a`
    text-align: center;
    color: red;
    margin-bottom: 5px;
`

function Login() {
    const [user, setUser] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [host, setHost] = useState<string>();

    const [warning, setWarning] = useState<boolean>(false);
    const [loginDisabled, setDisabled] = useState<boolean>(false);
    const navigate = useNavigate();

    const navigateToChatsList = () => navigate("/list");
    const showRedWarning = () => {
        setWarning(true)
        setTimeout(() => setWarning(false), 10000);
    }

    const loginHere = async (e) => {
        e.preventDefault();
        setDisabled(true);
        try {
            await loginWithPassword(host || "", {
            user,
            password: password || ""
            });
            navigateToChatsList();
        } catch(err){
            setDisabled(false);
            showRedWarning();
        }
    }

    const tryLoginWithAuthToken = async () => {
        setDisabled(true);
        try {
            await realTimeLoginWithAuthToken();
            navigateToChatsList();
        } catch(err){
            setDisabled(false);
        }
    }

    useEffect(() => {
        tryLoginWithAuthToken();
    }, []);

    return (
        <Container>
            <Form>

                <FormItem style={{textAlign:"center"}}>
                    <RCLogo src={rcLogo} />
                </FormItem>

                <FormItem>
                    <Label fontSize="26px" style={{textAlign:"center"}}>Login</Label>
                </FormItem>
                <HorizontalLine />

                <FormItem>
                    <Label fontSize="16px">Host</Label>
                    <FormInput placeholder="e.g. (https://open/rocket.chat)" type="text" onChange={(e) => setHost(e.target.value)} />
                </FormItem>

                <FormItem>
                    <Label fontSize="16px">Username or Email</Label>
                    <FormInput placeholder="Username or Email" type="text" onChange={(e) => setUser(e.target.value)} />
                </FormItem>

                <FormItem>
                    <Label fontSize="16px">Password</Label>
                    <FormInput placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </FormItem>

                {warning && <WarningItem>
                    <Label fontSize="14px">Wrong Host, Username or Password!</Label>
                </WarningItem>}

                <LoginButton disabled={loginDisabled} onClick={loginHere}>Login</LoginButton>

                <FormItem style={{textAlign: "center", margin: "15px"}}>
                    <Link href="#">Forgot your password?</Link>
                    <Link href="#">Create an account!</Link>
                </FormItem>
            </Form>
        </Container>
    );
}

export default hot(Login);
