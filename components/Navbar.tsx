'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarItem,
    Link,
} from '@nextui-org/react';

const Navbar = () => {
    const pathname = usePathname();
    const isCurrPageCustomers = pathname === '/' || pathname.startsWith('/customers');
    const isCurrPageCities = pathname === '/cities';

    return (
        <NextUINavbar maxWidth="xl">
            <NavbarContent
                className="flex gap-4"
                justify="center"
            >
                <NavbarItem isActive={isCurrPageCustomers}>
                    <Link
                        color={isCurrPageCustomers ? 'primary' : 'foreground'}
                        href="/"
                        as={NextLink}
                    >
                        Customers
                    </Link>
                </NavbarItem>

                <NavbarItem isActive={isCurrPageCities}>
                    <Link
                        color={isCurrPageCities ? 'primary' : 'foreground'}
                        href="/cities"
                        as={NextLink}
                    >
                        Cities
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};

export default Navbar;
