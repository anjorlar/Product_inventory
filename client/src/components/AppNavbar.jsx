import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";

class AppNavbar extends Component {
    state = {
        isOpen: false
    };
    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };
    render() {
        return (
            <div>
                <Navbar color="secondary" dark expand="md" className="mb-5">
                    <NavbarBrand tag={NavLink} to="/">
                        {/* <NavLink to="/">Tech Careers</NavLink> */}
                        Stockmanager
					</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink exact to="/users" className="nav-link">
                                    Users
								</NavLink>
                            </NavItem>
                            {this.props.isAuth && (
                                <NavItem>
                                    <NavLink to="/settings" className="nav-link">
                                        Settings

									</NavLink>
                                </NavItem>
                            )}
                            <NavItem>
                                {this.props.isAuth ? (
                                    <NavLink to="/logout" className="nav-link">
                                        Logout
									</NavLink>
                                ) : (
                                        <NavLink to="/auth" className="nav-link">
                                            Login
									</NavLink>
                                    )}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default AppNavbar;