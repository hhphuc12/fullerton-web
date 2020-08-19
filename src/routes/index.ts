import Login from 'features/Auth/screens/Login';
import ListBookings from 'features/Booking/screens/ListBookings';

export interface IRouteProps {
  name: string;
  path: string;
  icon: string;
  layout: string;
  component: any;
  type?: string;
  count?: number;
  color?: string;
  children?: IRouteProps[] | IRouteProps;
};

const routes: IRouteProps[] = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/booking",
    name: "Booking",
    icon: "ni ni-key-25 text-info",
    component: ListBookings,
    layout: "/dashboard"
  },
];

export default routes;
