import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;
  console.log("Access Token:", accessToken);
  console.log("User Role:", userRole);

  const publicRoutes = ["/", "/login", "/register", "/job"];
  const employerRoutes = [
    "/dashboard",
    "/dashboard/post",
    "/dashboard/profile",
    "/dashboard/service",
    "/dashboard/interview",
    "/job/add",
  ];
  const studentRoutes = [
    "/dashboard",
    "/dashboard/my-cv",
    "/dashboard/saved-jobs",
    "/dashboard/applied-jobs",
    "/dashboard/profile",
    "/cv",
    "/cv/add",
  ];

  const redirectToLogin = () => {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  };

  const goToHomePage = () => {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  };

  if (pathname.startsWith("/logout")) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("userRole");
    return response;
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/job/add") ||
    pathname.startsWith("/cv") ||
    pathname.startsWith("/cv/add")
  ) {
    if (!accessToken) {
      return redirectToLogin();
    }

    if (userRole === "Employer" && employerRoutes.includes(pathname)) {
      return NextResponse.next();
    } else if (userRole === "Student" && studentRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return goToHomePage();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/logout",
    "/job/:path*",
    "/dashboard/:path*",
    "/job/add",
    "/cv",
    "/cv/add",
  ],
};
