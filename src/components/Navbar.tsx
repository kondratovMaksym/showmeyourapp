"use client";

import React, { useState } from "react";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500));

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: isMobile ? "0" : "0 0 20px 20px", // Убираем округление на мобильных
        overflow: "hidden", // Чтобы не было лишних полос прокрутки
        boxShadow: "none",
        maxWidth: isAuthenticated
          ? isMobile
            ? "100%"
            : "400px"
          : isMobile
          ? "100%"
          : "300px",
        height: "40px",
        margin: "auto",
        backgroundColor: "#1aaf3b",
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "flex-end" : "center",
      }}
    >
      <Toolbar>
        {isMobile ? (
          <>
            {isAuthenticated ? (
              <>
                {user && !user.picture && (
                  <div className={styles.component}>
                    {user?.given_name?.[0]}
                  </div>
                )}
                {user?.picture && (
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={user?.picture}
                    alt="Profile picture"
                    width={35}
                    height={35}
                  ></Image>
                )}

                <IconButton
                  style={{ marginLeft: "10px" }}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      href={"/"}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      My Page
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleMenuClose}>
                    <LogoutLink
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Logout
                    </LogoutLink>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton
                  style={{ marginLeft: "10px" }}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <LoginLink
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Login
                    </LoginLink>
                  </MenuItem>
                </Menu>
              </>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 5,
              margin: "auto",
            }}
          >
            {isAuthenticated ? (
              <>
                <Button color="inherit">
                  <Link href={"/"}>My Page</Link>
                </Button>

                <>
                  {user && !user.picture && (
                    <div className={styles.component}>
                      {user?.given_name?.[0]}
                    </div>
                  )}
                  {user?.picture && (
                    <Image
                      style={{ borderRadius: "50%" }}
                      src={user?.picture}
                      alt="Profile picture"
                      width={35}
                      height={35}
                    ></Image>
                  )}
                </>

                <Button color="inherit">
                  <LogoutLink style={{ height: "fit-content" }}>
                    Logout
                  </LogoutLink>
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit">
                  <LoginLink style={{ height: "fit-content" }}>Login</LoginLink>
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
