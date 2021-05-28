import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import tw from "twin.macro";

const links = [
    {
        href: "/login",
        label: "Login"
    },
    {
        href: "/signup",
        label: "Sign Up"
    }
];

const SNavbar = tw(Navbar)`
    px-4 fixed w-full
`;

export default function MyNavbar() {
    return (
        <SNavbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Newsgen</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {
                        links.map((link, index) => {
                            const { href, label } = link;
                            return (
                                <Nav.Link href={href} key={index}>
                                    <Button variant="light">{label}</Button>
                                </Nav.Link>
                            );
                        })
                    }
                </Nav>
            </Navbar.Collapse>
        </SNavbar>
    );
}