import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {Bounce, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const navigation = [
  { name: 'Accueil', href: '#' },
  { name: 'Salon', href: '/#/chat-room' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const user = JSON.parse(localStorage.getItem('user'));

export default function NavbarComponent({ profilePic, socket }) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const Logout = () => {
    socket.emit('leave', user.username);
    socket.on('leaveResponse', (data) => {
      toast.success(`Utilisateur ${data} déconnecté`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      if (data === user.username) {
        localStorage.removeItem('user');
      }
    });
    removeCookie('token');
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="w-auto text-white text-xl">Instant messages</p>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          { user &&
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={profilePic}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="flex-col items-center justify-center">
                  <p className="text-gray-700 text-2xl font-semibold text-center">Bienvenue {user.username}</p>
                  <p className="text-gray-400 text-center">{user.email}</p>
                </div>
                <div className="my-1 h-px bg-black/20"/>
                <p className="text-2xl text-center my-3">Votre compte</p>
                <MenuItem>
                <a href="/#/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    <FontAwesomeIcon className={"mr-2"} icon={faUser} /> Mon profil
                  </a>
                </MenuItem>
                <MenuItem>
                  <button onClick={Logout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    <FontAwesomeIcon className={"mr-2"} icon={faRightFromBracket} /> Se déconnecter
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          }
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
