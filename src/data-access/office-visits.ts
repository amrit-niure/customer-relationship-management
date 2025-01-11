import { database } from "@/db/connection";

export async function getAllOfficeVisits(){
    const officeVisits = await database.query.officeVisits.findMany({
        with: {
            client: true,
            appointment: true,
            agent: true
        },
    });
    return officeVisits;
}