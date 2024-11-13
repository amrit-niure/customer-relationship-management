// "use server";
// import { InputParseError } from "@/src/entities/errors/common";
// import { Cookie } from "lucia";
// import { cookies } from "next/headers";
// import { ISignIn } from "@/src/entities/models/users";
// import { redirect } from "next/navigation";


// export async function signIn(data: ISignIn) {
//     const { email, password } = data;
//     let sessionCookie: Cookie;
//     try {
//         const result = await signInController({
//             email,
//             password,
//         });
//         sessionCookie = result.cookie;
//     } catch (error) {
//         if (error instanceof InputParseError) {
//             return {
//                 error:
//                     "Invalid data. Make sure the Password and Confirm Password match.",
//             };
//         }
//         return {
//             error: (error as Error).message,
//         };
//     }
//     cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes,
//     );
//     redirect("/dashboard");
// }

// export async function signOut(sessionId: string) {
//     await signOutController(sessionId);
//     redirect("/signin");
// }


"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { loginSchema } from "@/schema/user";
import { signInUseCase } from "@/use-cases/users/sign-in.use-case";
import { redirect } from "next/navigation";

export const signInAction = unauthenticatedAction
    .createServerAction()
    .input(loginSchema)
    .handler(async ({ input }) => {
        await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
        const user = await signInUseCase(input.email, input.password);
        await setSession(user.id);
        redirect(afterLoginUrl);
    });