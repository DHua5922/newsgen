import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'; 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Home } from "@styled-icons/boxicons-solid/Home";
import styled from "styled-components";
import Link from "next/link";
import { styles } from "../../../styles/globals";
import { pageLink } from '../../constants';

const HomeIcon = styled(Home)`${styles.sideNavIcon}`;

const defaultNavItems = [
    {
        href: pageLink.dashboard,
        eventKey: "home",
        label: "Home",
        icon: <HomeIcon />
    }
];

export default function Sidenav({ navItems }) {
    const items = navItems ? navItems : defaultNavItems;

    return (
        <SideNav>
            <Toggle />
            <Nav>
            {
                items.map(item => {
                    const { 
                        href, eventKey,
                        icon, label 
                    } = item;

                    return (
                        <Link href={href}>
                            <NavItem 
                                eventKey={eventKey}
                            >
                                <NavIcon>{icon}</NavIcon>
                                <NavText>{label}</NavText>
                            </NavItem>
                        </Link>
                    );
                })
            }
            </Nav>
        </SideNav>
    );
}