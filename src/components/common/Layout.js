import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/Providers/AuthProvider";

const Layout = ({ children, layout, activeClass, notAuthPage }) => {
  const router = useRouter();
  const useAuth = useAuthContext();

  if (notAuthPage === true) {
    return <>{children}</>;
  }

  if (notAuthPage === false && useAuth?.user === null) {
    router.push("/login");
    return <></>;
  }

  return (
    <>
      {
        <>
          {layout === "default" && <div className={"inner"}></div>}
          {children}
        </>
      }
    </>
  );
};

export default Layout;
