import { LoginError } from "../errors";
import { getUserByEmail, verifyPassword } from "@/data-access/users";

export async function signInUseCase(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new LoginError();
    }
    const isPasswordCorrect = await verifyPassword(email, password);
    if (!isPasswordCorrect) {
        throw new LoginError();
    }
    return { id: user.id };
}