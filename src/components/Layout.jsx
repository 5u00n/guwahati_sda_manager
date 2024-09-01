import React from 'react';
import { Outlet } from 'react-router-dom';


import { Avatar, Dropdown, Navbar, Footer } from "flowbite-react";

import Logo from "../assets/logo.png";
function Layout() {
    return (
        <React.Fragment >
            <div className='flex flex-col min-h-screen'>
                <header>
                    <Navbar fluid rounded>
                        <Navbar.Brand href="https://flowbite-react.com">
                            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Guwahati SDA Church Manager</span>
                        </Navbar.Brand>
                        <div className="flex md:order-2">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img="" rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">Bonnie Green</span>
                                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </div>
                        <Navbar.Collapse>
                            <Navbar.Link href="/" active>
                                Home
                            </Navbar.Link>
                            <Navbar.Link href="/about">About</Navbar.Link>
                            <Navbar.Link href="/contacts">Contacts</Navbar.Link>
                            <Navbar.Link href="/globals">Globals</Navbar.Link>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
                <div className="flex-grow mx-5 my-10">
                    <Outlet />
                </div>
                <Footer container>
                    <Footer.Copyright href="#" by="Guwahati SDA Church" year={new Date().getFullYear().toString()} />

                </Footer>
            </div>
        </React.Fragment>
    )
}

export default Layout