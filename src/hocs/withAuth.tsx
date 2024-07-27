import React from "react";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

export default function withAuth(allowedRoles: string[]) {
  return function <P extends object>(Component: React.FC<P>) {
    return async function (props: P) {
      const session = await auth();

      // redirect the user to the login page if not logged in
      if (!session) redirect("/login");

      // show 403 page if the user has not one of the required roles to access the page
      if (allowedRoles.length)
        if (!allowedRoles.includes(session.user?.role)) {
          return <p>404</p>;
        }

      return <Component {...(props as P)} />;
    };
  };
}
