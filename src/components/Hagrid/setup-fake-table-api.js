import { Server } from "miragejs";
import { faker } from "@faker-js/faker";

export default function () {
    const server = new Server();

    server.get("/api/tabledata", (schema, request) => {
        const records = [];
        const numToGenerate = 50;
        for (let i = 0; i < numToGenerate; i++) {
            records[i] = getTableRow();
        }
        return {
            records,
        };
    });
}

function getTableRow() {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        favCat: faker.animal.cat(),
    };
}
