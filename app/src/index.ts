import Tobspress from "@tobshub/tobspress";
import path from "path";
import TobsDB, { PrimaryKey } from "tobsdb";

const PORT = 4000;
const app = new Tobspress({ log: true });
app.static("public");

type DB = {
  todo: {
    id: PrimaryKey<number>;
    content: string;
    createdAt?: Date;
  };
};

async function main() {
  const db = await TobsDB.connect<DB>(
    "ws://localhost:7085",
    "example_todo_app",
    {
      schema_path: path.join(process.cwd(), "tdb/schema.tdb"),
      auth: { username: "user", password: "pass" },
    }
  );

  app.post("/todo", async (req, res) => {
    const { content } = await req.body;
    const ret = await db.create("todo", { content });
    await res.send(ret.data);
  });

  app.get("/todo", async (_, res) => {
    const ret = await db.findMany("todo", {});
    await res.send(ret.data);
  });

  app.delete("/todo", async (req, res) => {
    const { id } = await req.body;
    const ret = await db.deleteUnique("todo", { id });
    await res.send(ret.data);
  });

  app.use("/", (_, res) => {
    res.sendFile("public/index.html");
  });

  process.on("SIGINT", () => {
    db.disconnect();
    process.exit();
  });
}

main().then(() => {
  app.listen(PORT);
});
