import React from 'react';
import {
  Row,
  Col,
  Container
} from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from 'routes';

type AuthProps = {};

const Auth: React.FC<AuthProps> = (props: AuthProps) => {
  const getRoutes = () => {
    return routes.map((route, key) => {
      if (route.layout === '/auth') {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className='main-content'>
      <div className='header bg-gradient-info py-7 py-lg-8'>
        <Container>
          <div className='header-body text-center mb-7'>
            <Row className='justify-content-center'>
              <Col lg='5' md='6'>
                <h1 className='text-white'>Wellness Booking Portal</h1>
                <p className='text-lead text-light'>
                  Fullerton Healthcare Group
                </p>
              </Col>
            </Row>
          </div>
        </Container>
        <div className='separator separator-bottom separator-skew zindex-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
          >
            <polygon
              className='fill-default'
              points='2560 0 2560 100 0 100'
            />
          </svg>
        </div>
      </div>
      <Container className='mt--8 pb-5'>
        <Row className='justify-content-center'>
          <Switch>
            {getRoutes()}
            <Redirect from='*' to='/auth/login' />
          </Switch>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;
