"use client"

/* eslint-disable @next/next/no-img-element */
import { Children, useState, useEffect } from "react";
import AuthModal from "../AuthModal";
import { Input, Drawer } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {useSession, signOut} from 'next-auth/react'
import { getGames, searchGamesByName, useAuth } from "@/app/services/firebase";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import RandomAvatar from "../Avatars";

const HeaderLayout = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileUserOpen, setMobileUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {data: session} = useSession()

  const user = session

  const openLoginModal = () => {
    setLoginModalOpen(true);
    if (isMobileUserOpen) {
      toggleMobileUser();
    }
  };
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    if (isMobileUserOpen) {
      toggleMobileUser();
    }
  };
  
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  
  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };
  
  const handleSignOut = async () => {
    await signOut({callbackUrl: '/'});
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileUser = () => {
    setMobileUserOpen(!isMobileUserOpen);
  };
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]); 
      return;
    }
  
    const results: any = await searchGamesByName(searchQuery);
  
    setSearchResults(results);
  };
  
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className=" bg-gradient-to-r from-teal-800  to-indigo-800 p-4 flex items-center justify-between fixed w-full top-0 z-10 dark:bg-gradient-dark">
        <nav className="lg:hidden bg-teal-500">
          <button onClick={toggleMobileMenu} className="bg-gray-900">
            <MenuOutlined className="text-3xl dark:text-white" />
          </button>
          {isMobileMenuOpen && (
            <Drawer
              className="bg-white absolute top-16 p-4 rounded shadow-md dark:bg-gray-900 text-gray-900"
              placement="left"
              closable={true}
              onClose={toggleMobileMenu}
              open={isMobileMenuOpen}
              closeIcon={
                <CloseCircleOutlined className="text-white text-3xl" />
              }
            >
              <ul className="space-y-2 text-white">
                <li>
                  <a href="#">Library</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </Drawer>
          )}
        </nav>

        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 mr-2 flex items-center dark:bg-gray-700 bg-white"
            onClick={() => (window.location.href = "/")}
          />
          <h1 onClick={() => (window.location.href = "/")} className="text-white text-2xl font-bold dark:text-white">
            Better is possible
          </h1>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          <Drawer
            className="bg-white absolute top-16 p-4 rounded shadow-md dark:bg-gray-900 text-gray-900"
            placement="right"
            closable={true}
            onClose={toggleMobileUser}
            open={isMobileUserOpen}
            closeIcon={<CloseCircleOutlined className="text-white text-3xl" />}
          >
            <ul className="space-y-2">
              <li>
                <Input
                  type="text"
                  placeholder="Search"
                  className="input-field dark:text-white text-white border border-green-500 rounded "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  addonBefore={
                    <SearchOutlined className="text-white text-3xl" />
                  }
                  onPressEnter={handleSearch}
                />
              </li>
              {user ? (
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-primary border rounded border-primary p-2 w-full"
                  >
                    Sign out
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      onClick={openLoginModal}
                      className="button1 border rounded border-white p-2 w-full bg-white text-bold"
                    >
                      Sign in
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openRegisterModal}
                      className="button2 text-white bg-gray-900 rounded p-2 w-full"
                    >
                      Sign up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </Drawer>
          {user || !user ? (
            <button onClick={toggleMobileUser} className="text-white">
              <UserOutlined className="text-3xl" />
            </button>
          ) : null}
        </div>
        <div className="lg:flex hidden items-center space-x-4">
          <Input
            type="text"
            placeholder="Search"
            className=" dark:text-black border border-gray-900 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            addonBefore={
              <SearchOutlined className="text-white text-3xl dark:text-white" />
            }
            onPressEnter={handleSearch}
          />
          <div>
            <button onClick={() => (window.location.href = "/cart")} className="bg-black-700 hover:bg-gray-300 border-2 rounded-md w-12 h-12 text-lg text-violet-600 border-primary dark:border-gray-600">
                <span className="cart-count"><ShoppingCartOutlined /></span>
              </button>
          </div>
          <div>
            {currentTheme === "dark" ? (
              <button
                className="bg-black-700 hover:bg-gray-300 w-12 rounded-md border-primary border-2 p-3 dark:border-gray-600"
                onClick={() => setTheme("light")}
              >
                {" "}
                <Image src="/sun.svg" alt="logo" height="20" width="20" />
              </button>
            ) : (
              <button
                className="bg-black-700 w-12 rounded-md border-primary border-2 p-3 hover:bg-gray-300 dark:border-gray-600"
                onClick={() => setTheme("dark")}
              >
                <Image src="/moon.svg" alt="logo" height="20" width="20" />
              </button>
            )}
          </div>
          {user ? (
            <RandomAvatar />
          ) : (
            <>
              <button
                onClick={openLoginModal}
                className="text-black dark:text-white"
                style={{width: '100px'}}
              >
                Sign in
              </button>
              <span className="text-black dark:text-white">|</span>
              <button
                onClick={openRegisterModal}
                className="text-black dark:text-white "
                style={{width: '100px'}}
              >
                Sign up
              </button>
            </>
          )}
        </div>

        <AuthModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          initialTab={0}
        />
        <AuthModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          initialTab={1}
        />
      </div>
    </ThemeProvider>
  );
};

export default HeaderLayout;
