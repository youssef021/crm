const app = require("../index");
const fs = require("fs");
const authJwt = require("../Authentification/middleware/authJwt");
const uuid = require("uuid");
const cors = require("cors");
app.use(cors());

app.post(
  "/dentists/add",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      // const password = await hash(req.body.password);
      app.db.transaction(async (trx) => {
        const id = uuid.v1().toLocaleUpperCase();
        await trx.table("dentists").insert({
          id: id,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          dateinscription: req.body.dateinscription,
          numerocode: req.body.numerocode,
          email: req.body.email,
          password: req.body.password,
        });

      });

    } catch (error) {
      console.log(error);
    }
  }




);


///////////////list admin agence
app.get("/v3/adminagence/list", async (req, res) => {
  try {
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const admin = (await app.db.table("app_user")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const admins = (await app.db.from("agence_admin " + " as p")).map((e) => ({
      ...e,
      agence: agence[e.agence],
      admin: admin[e.admin],
    }));

    res.json({
      code: "success",
      content: admins,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/pdf", (req, res) => {
  var file = fs.createReadStream("./public/sample.pdf");
  file.pipe(res);
});

