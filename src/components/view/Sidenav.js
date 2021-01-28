import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'; 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Home } from "@styled-icons/boxicons-solid/Home";
import styled from "styled-components";
import { styles } from "../../../styles/globals";
import { pageLink } from '../../constants';
import { LogOut } from "@styled-icons/boxicons-regular/LogOut";
import { useRouter } from 'next/router';
import { userServices } from '../../services/user/UserService';
import ConfirmationPrompt from './ConfirmationPrompt';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ErrorMessage } from "./ErrorMessage";
import { News } from "@styled-icons/boxicons-regular/News";

const HomeIcon = styled(Home)`${styles.sideNavIcon}`;
const LogoutIcon = styled(LogOut)`${styles.sideNavIcon}`;
const NewsIcon = styled(News)`${styles.sideNavIcon}`;

export default function Sidenav({ sidenav, navItems }) {
    const router = useRouter();
    
    const [hasLogoutError, setHasLogoutError] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);

    const defaultNavItems = [
        {
            onClick: () => router.push(pageLink.dashboard),
            eventKey: "home",
            label: "Home",
            icon: <HomeIcon />
        },
        {
            onClick: () => router.push(pageLink.news),
            eventKey: "news",
            label: "News",
            icon: <NewsIcon />,
        },
        {
            onClick: () => setShowPrompt(true),
            eventKey: "logout",
            label: "Log Out",
            icon: <LogoutIcon />,
        }
    ];

    const footerButtons = [
        {
            props: {
                onClick: () => setShowPrompt(false)
            },
            children: "Close"
        },
        {
            props: {
                onClick: () => userServices
                    .logout()
                    .then(() => router.push(pageLink.home))
                    .catch(() => setHasLogoutError(true)),
            },
            children: "Log Out"
        }
    ];

    const items = navItems ? navItems : defaultNavItems;

    return (
        <>
            <SideNav {...sidenav}>
                <Toggle />
                <Nav>
                {
                    items.map(item => {
                        const { 
                            onClick, eventKey,
                            icon, label 
                        } = item;

                        return (
                            <NavItem 
                                eventKey={eventKey}
                                onClick={onClick}
                            >
                                <NavIcon>{icon}</NavIcon>
                                <NavText>{label}</NavText>
                            </NavItem>
                        );
                    })
                }
                </Nav>
            </SideNav>

            <ConfirmationPrompt 
                modal={{
                    show: showPrompt,
                    onHide: () => setShowPrompt(false)
                }}
                header={{
                    children: "Logout?"
                }}
                body={{
                    children: 
                        <>
                            Are you sure you want to logout?
                            { 
                                hasLogoutError && 
                                    <ErrorMessage 
                                        message={"There was a problem logging you out. Please try again."} 
                                    />
                            }
                        </>
                }}
                footer={{
                    children: footerButtons.map(button => 
                        <Button {...button.props}>
                            {button.children}
                        </Button>
                    )
                }}
            />
        </>
    );
}