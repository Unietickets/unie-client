import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const privateRoutes = ['/private', '/dashboard', '/profile'];

export async function middleware(req) {
  const session = await getServerSession(req, authOptions);
  
  if (!session && privateRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}