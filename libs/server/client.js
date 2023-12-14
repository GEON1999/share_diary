import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.$on("query", (e) => {
  //console.log(e.query);
});

export default client;
