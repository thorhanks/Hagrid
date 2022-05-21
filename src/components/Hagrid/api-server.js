import { createServer, Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";

const TOTAL_CATS = 1000;

export function makeServer({ environment = "development" } = {}) {
    createServer({
        environment,

        models: {
            cat: Model,
        },

        factories: {
            cat: Factory.extend({
                name: () => faker.name.findName(),
                type: () => faker.animal.cat(),
                avatarImgUrl: () => faker.image.cats(640, 480, true),
                address: () =>
                    `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
                price: () => faker.commerce.price(10, 100000, 2, "$"),
            }),
        },

        seeds(server) {
            server.createList("cat", TOTAL_CATS);
        },

        routes() {
            this.namespace = "api";

            this.get("/cats", (schema, request) => {
                let pageNum = parseInt(request.queryParams.page, 10);
                let pageSize = parseInt(request.queryParams.size, 10);
                let sortValueProp = request.queryParams.sortby;
                let sortDirection = request.queryParams.sortdirection;

                let cats = schema.cats.all().models.sort((a, b) => {
                    const valA = a[sortValueProp].toUpperCase();
                    const valB = b[sortValueProp].toUpperCase();
                    if (valA < valB) {
                        return sortDirection === "asc" ? -1 : 1;
                    }
                    if (valA > valB) {
                        return sortDirection === "asc" ? 1 : -1;
                    }
                    return 0;
                });

                let pageIndex = pageNum - 1;
                let start = pageIndex * pageSize;
                let end = start + pageSize;
                cats = cats.slice(start, end);

                return {
                    records: cats,
                    totalRecordCount: TOTAL_CATS,
                };
            });
        },
    });
}
