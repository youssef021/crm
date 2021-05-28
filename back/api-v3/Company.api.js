const app = require("../index");
const fs = require("fs");
const authJwt = require("../Authentification/middleware/authJwt");
const uuid = require("uuid");
const cors = require("cors");
app.use(cors());
app.get("/company/list", async (req, res) => {
    try {
      const company = (await app.db.table("company")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
  
      res.json({
        code: "success",
        content: company,
      });
    } catch (error) {
      console.log(error);
    }
  });