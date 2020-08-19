import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes, { IRouteProps } from 'routes';
import Sidebar from 'components/Sidebar/Sidebar';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import { RouteHistory } from 'features/Shared/declarations';

type DashboardProps = {
  location: {
    pathname: string,
  },
  logout: () => void;
  history: RouteHistory,
};

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (props.location.pathname.includes(routes[i].layout + routes[i].path)) {
        return routes[i].name;
      }
    }
    return 'Booking';
  }

  const getRoutes = () => {
    return routes.map((route: IRouteProps, key: number) => {
      if (route.layout === '/dashboard') {
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
    <>
      <Sidebar
        {...props}
        routes={routes.filter(route => route.layout === '/dashboard')}
        logo={{
          innerLink: '/dashboard/booking',
          imgSrc: require('assets/img/brand/argon-react.png'),
          imgAlt: '...'
        }}
      />
      <div className='main-content'>
        <AdminNavbar
          {...props}
          brandText={getBrandText()}
        />
        <Switch>
          {getRoutes()}
          <Redirect from='*' to='/dashboard/booking' />
        </Switch>
      </div>
    </>
  );
}

export default Dashboard;
