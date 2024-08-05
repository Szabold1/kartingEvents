import styled, { keyframes } from "styled-components";
import { IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform:  translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const StyledContainer = styled.div`
  z-index: 120;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg[5]};
  backdrop-filter: blur(1rem);
  color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(241, 241, 241, 0.9)" : theme.colors.text[1]};
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.3);
`;

const StyledNavHeader = styled.nav`
  background-color: ${({ theme }) => theme.colors.bg[5]};
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    padding: 1rem;
    font-size: 1.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    & span {
      color: rgb(0, 222, 222);
    }

    @media screen and (min-width: 70rem) {
      font-size: 1.9rem;
      letter-spacing: 0.2rem;
    }
  }

  @media screen and (min-width: 40rem) {
    padding: 0 1rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 0 2rem;
  }
`;

const StyledIconContainer = styled.div`
  padding: 0.9rem 1rem;
  cursor: pointer;

  @media screen and (min-width: 70rem) {
    display: none;
  }
`;

const StyledMobileNav = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  top: 0rem;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1.5rem 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(1.5rem);
  -webkit-backdrop-filter: blur(1.5rem);
  transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  animation: ${({ $show }) => ($show ? slideIn : slideOut)} 0.4s forwards;

  > ul {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;

    > li {
      max-width: 22rem;
      width: 75%;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      padding: 1.2rem;
      cursor: pointer;
      background-color: rgba(241, 241, 241, 0.2);
      border-radius: 0.6rem;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: ${({ theme }) => theme.colors.accent[1]};
      }
    }
  }
`;

const StyledDesktopNav = styled.ul`
  display: flex;

  > li {
    letter-spacing: 0.1rem;
    padding: 1.4rem 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-bottom: 1.5px solid transparent;

    &:hover {
      color: rgb(0, 222, 222);
      border-bottom: 1.5px solid rgb(0, 222, 222);
    }

    @media screen and (min-width: 40rem) {
      padding: 1.8rem 1.2rem;
    }
  }
`;

export default function RootLayout() {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1120); // 70rem

  const navLinks = [
    { path: "/calendar", label: "Calendar" },
    { path: "/results", label: "Results" },
    { path: "/circuits", label: "Circuits" },
    { path: "/engines-categories", label: "Engines & Categories" },
    { path: "/championships", label: "Championships" },
    { path: "/teams", label: "Teams" },
  ];

  function handleNavClick() {
    setShowNav((prev) => !prev);
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1120);
      setShowNav(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <StyledContainer>
        <StyledNavHeader>
          <h1>
            <StyledNavLink to={"/"}>
              Kart<span>iiing</span>
            </StyledNavLink>
          </h1>
          <StyledIconContainer onClick={handleNavClick}>
            {showNav ? <IoClose size={35} /> : <IoMenu size={35} />}
          </StyledIconContainer>

          <StyledMobileNav $show={showNav}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.path} onClick={handleNavClick}>
                  <StyledNavLink to={link.path} onClick={handleNavClick}>
                    {link.label}
                  </StyledNavLink>
                </li>
              ))}
            </ul>
          </StyledMobileNav>

          {!isMobile && (
            <StyledDesktopNav>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <StyledNavLink to={link.path}>{link.label}</StyledNavLink>
                </li>
              ))}
            </StyledDesktopNav>
          )}
        </StyledNavHeader>
      </StyledContainer>

      <main>
        <Outlet />
      </main>
    </>
  );
}