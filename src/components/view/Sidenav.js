import { Home } from "@styled-icons/boxicons-solid/Home";
import tw from "tailwind-styled-components";
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
import { Profile } from "@styled-icons/icomoon/Profile";

const HomeIcon = styled(Home)`${styles.sideNavIcon}`;
const LogoutIcon = styled(LogOut)`${styles.sideNavIcon}`;
const NewsIcon = styled(News)`${styles.sideNavIcon}`;
const ProfileIcon = styled(Profile)`${styles.sideNavIcon}`;
const MySidenav = tw.div`
    fixed
    bg-gray-50
    h-full
`;

const NavItem = tw.div`
    flex 
    items-center 
    cursor-pointer 
    px-3 py-2 
    hover:bg-gray-100
`;

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
            onClick: () => router.push(pageLink.profile),
            eventKey: "profile",
            label: "Profile",
            icon: <ProfileIcon />,
        },
        {
            onClick: () => setShowPrompt(true),
            eventKey: "logout",
            label: "Log Out",
            icon: <LogoutIcon />,
        },
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
            <MySidenav {...sidenav}>
                {
                    items.map(item => {
                        const { onClick, icon, label } = item;
                        return (
                            <NavItem onClick={onClick}>
                                <div>{icon}</div>
                                <div className="ml-2">{label}</div>
                            </NavItem>
                        );
                    })
                }
            </MySidenav>

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