import Link from "next/link";

import { ROUTES } from "@core/routes";

export const Header = () => {
    const routes = Object.values(ROUTES);

    return (
      <header className="bg-gray-800 p-4">
        <nav>
          <ul className="flex space-x-4">
            {routes.map((route) => (
              <li key={route.href}>
                <Link href={route.href} className="text-white hover:text-gray-300">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  };
  