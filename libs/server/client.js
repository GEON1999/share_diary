import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

client.$on("query", (e) => {
  //console.log(e.query);
});

export default client;
