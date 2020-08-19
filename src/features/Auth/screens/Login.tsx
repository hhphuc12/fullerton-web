import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from 'reactstrap';
import { signIn } from '../actions';
import { clearStore } from 'features/Shared/actions';
import { RouteHistory } from 'features/Shared/declarations';
import LocalStorage from 'utils/localStorage';

type LoginProps = {
  token: string,
  signIn: (email: string, password: string) => void,
  clearStore: () => void;
  history: RouteHistory,
};

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { token, signIn, history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.clearStore();
    if (LocalStorage.getAccessToken()) history.push('/dashboard/booking');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) history.push('/dashboard/booking');
  }, [token, history]);

  const handleSignIn = () => {
    signIn(email, password);
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("assets/img/icons/common/facebook.svg")}
                  />
                </span>
                <span className="btn-inner--text">Facebook</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("assets/img/icons/common/google.svg")}
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={handleSignIn} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

type State = {
  auth: { token: string },
}

const mapStateToProps = (state: State) => ({
  token: state.auth.token,
});

const mapActionToProps = {
  signIn,
  clearStore,
};

export default compose(withRouter, connect(mapStateToProps, mapActionToProps))(Login);
