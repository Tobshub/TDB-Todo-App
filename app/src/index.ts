import Tobspress from "@tobshub/tobspress";
import TobsDB from "tobsdb";

const PORT = 4000;
const app = new Tobspress({ log: true });
app.static("public");

async function main() {
  const db = await TobsDB.connect("ws://localhost:7085");

  app.post("/todo", async (req, res) => {
    const { content } = await req.body
    const ret = await db.create("todo", { content })
    await res.send(ret.data)
  })

  app.get("/todo", async (_, res) => {
    const ret = await db.findMany("todo", {})
    await res.send(ret.data)
  })

  app.delete("/todo", async (req, res) => {
    const { id } = await req.body
    const ret = await db.deleteUnique("todo", { id })
    await res.send(ret.data)
  })

  app.use("/", (_, res) => {
    res.sendFile("public/index.html");
  })
}

main().then(() => {
  app.listen(PORT);
});