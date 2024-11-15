import { NextResponse } from "next/server";

export const config = { matcher: ["/dashboard/(.*)"] };

export async function middleware() {
    return NextResponse.next();
}