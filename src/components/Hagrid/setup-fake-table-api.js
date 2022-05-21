import { Server } from "miragejs";
import { faker } from "@faker-js/faker";

export default function () {
    const server = new Server();

    server.get(
        "/api/tabledata",
        (schema, request) => {
            const records = [];
            const numToGenerate = 100;
            let totalRecordCount = 1000;
            for (let i = 0; i < numToGenerate; i++) {
                records[i] = getTableRow();
            }
            return {
                records,
                totalRecordCount,
            };
        },
        { timing: 1000 }
    );
}

function getTableRow() {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        type: faker.animal.cat(),
        avatarImgUrl: faker.image.cats(640, 480, true),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
        price: faker.commerce.price(10, 100000, 2, "$"),
    };
}
