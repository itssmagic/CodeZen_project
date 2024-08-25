import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { ArrowRightEndOnRectangleIcon, ArrowRightIcon, Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "My Submission", href: "/submissions", current: false },

];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar_Modern() {
    const { logout, user } = useUser();

    useEffect(() => { }, [user, user?.role]);
    return (
        <Disclosure as="nav" className="border-b-2 border-gray-300 px-2">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#164c60] hover:bg-[#164c60] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 md:items-center ml-14 sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 md:items-center">
                            <img
                                alt="Your Company"
                                src="/codingMindSet.png"
                                className="h-6 md:h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? "page" : undefined}
                                        className={classNames(
                                            item.current
                                                ? "text-black"
                                                : "text-black/60 hover:text-black/75",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {user?.role === "admin" && (
                                    <>
                                        <Link key="manage problems"
                                            to={"/problems"}
                                            className={classNames("text-black/60 hover:text-black/75",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}>
                                            Manage Problems
                                        </Link>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {user?.email ? (
                            <>
                                <button
                                    type="button"
                                    className="relative rounded-full p-1 text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                            >
                                                Your Profile
                                            </Link>
                                        </MenuItem>

                                        <MenuItem>
                                            <button
                                                onClick={logout}
                                                className="w-full flex gap-2 px-4 py-2 text-sm text-red-700 data-[focus]:bg-red-200"
                                            >
                                                Sign out <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <Link
                                to={'/login'}
                                className="flex items-center justify-center gap-2 text-white bg-[#164c60] hover:bg-[#164c60] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 md:px-5 py-2 md:py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign In<ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 border border-black px-4 pb-3 pt-2 h-screen items-center justify-center">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-[#164c60]/25 text-[#164c60]"
                                    : "text-[#164c60] hover:bg-[#164c60]/25 hover:text-[#164c60]/75",
                                "block rounded-md px-3 py-2 text-base font-medium justify-center"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    {user?.role === "admin" && (
                        <>
                        <DisclosureButton
                            as="span" 
                        >
                            <Link
                                key={"manage problem"}
                                to={'/problems'}
                                className={classNames(
                                     "text-[#164c60] hover:bg-[#164c60]/25 hover:text-[#164c60]/75",
                                    "block rounded-md px-3 py-2 text-base font-medium justify-center"
                                )}
                            >
                                Manage Problem
                            </Link>
                        </DisclosureButton>
                            

                        </>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
