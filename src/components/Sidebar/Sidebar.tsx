import React, { useState } from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  NavbarBrand
} from 'reactstrap';
import { IRouteProps } from 'routes';

type SidebarProps = {
  routes: IRouteProps[];
  logo: {
    imgSrc: string;
    imgAlt: string;
    innerLink: string;
    outterLink?: string;
  };
};

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const [ collapseOpen, setCollapseOpen ] = useState(false);

  const { logo } = props;

  // const activeRoute = (routeName: string) => {
  //   return props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  // }

  const toggleCollapse = () => setCollapseOpen(!collapseOpen);

  const closeCollapse = () => setCollapseOpen(false);

  const createLinks = () => {
    return props.routes.map((route: IRouteProps, key: number) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={route.layout + route.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName='active'
          >
            <i className={route.icon} />
            {route.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank"
    };
  }

  return (
    <Navbar
      className='navbar-vertical fixed-left navbar-light bg-white'
      expand='md'
      id='sidenav-main'
    >
      <Container fluid>
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleCollapse}
        >
          <span className='navbar-toggler-icon' />
        </button>
        {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
        <Nav className='align-items-center d-md-none'>
          <UncontrolledDropdown nav>
            <DropdownToggle nav className='nav-link-icon'>
              <i className='ni ni-bell-55' />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby='navbar-default_dropdown_1'
              className='dropdown-menu-arrow'
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className='align-items-center'>
                <span className='avatar avatar-sm rounded-circle'>
                  <img
                    alt='...'
                    src={require('assets/img/theme/team-1-800x800.jpg')}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className='dropdown-menu-arrow' right>
              <DropdownItem className='noti-title' header tag='div'>
                <h6 className='text-overflow m-0'>Welcome!</h6>
              </DropdownItem>
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-single-02' />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-settings-gear-65' />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-calendar-grid-58' />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-support-16' />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href='#pablo' onClick={e => e.preventDefault()}>
                <i className='ni ni-user-run' />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className='navbar-collapse-header d-md-none'>
            <Row>
              <Col className='collapse-close' xs='6'>
                <button
                  className='navbar-toggler'
                  type='button'
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className='mt-4 mb-3 d-md-none'>
            <InputGroup className='input-group-rounded input-group-merge'>
              <Input
                aria-label='Search'
                className='form-control-rounded form-control-prepended'
                placeholder='Search'
                type='search'
              />
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <span className='fa fa-search' />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <Nav navbar>{createLinks()}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
