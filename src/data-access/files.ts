import { database } from "@/db/connection";
import { File, files, NewFile } from "@/db/schema/files";
import { handleDatabaseError } from "@/errors/database";

export const createFileRecord = async (input: NewFile[], clientId: string): Promise < File[] > => {
    console.log("Create File Record Input :", input)
    console.log("Client Id:", clientId)
    try {
        const fileData = input.map(file => ({
            ...file,
            clientId
        }));
        const query = database.insert(files).values(fileData).returning();
        const createdFiles = await query.execute();
        return createdFiles;
    } catch (err) {
        console.error("Error in createFileRecord:", err);
        throw handleDatabaseError(err, "file creation", input);
    }
}