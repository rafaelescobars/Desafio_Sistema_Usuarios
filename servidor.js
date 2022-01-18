const http = require('http');
const fs = require('fs');
const {
  insertar,
  consultar,
  login
} = require("./consultas");


http.
createServer((req, res) => {
    if (req.url == "/" && req.method === "GET") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFile("index.html", "utf8", (err, html) => {
        res.end(html);
      });
    }

    if (req.url.startsWith("/usuario") && req.method === "POST") {

      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {

        try {
          const datos = Object.values(JSON.parse(body));
          const respuesta = await insertar(datos);
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(respuesta));
        } catch (error) {
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(`Ha ocurrido un error inesperado.`);

        }
      });
    }

    if (req.url.startsWith("/usuarios") && req.method === "GET") {

      try {
        const respuesta = consultar().then((data) => {
          res.end(JSON.stringify(data.rows));
        });
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
      } catch (error) {
        res.writeHead(500, {
          'Content-Type': 'application/json'
        });
        res.end(`Ha ocurrido un error inesperado.`);
      }
    }

    if (req.url.startsWith("/login") && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {

        try {
          const datos = Object.values(JSON.parse(body));
          const respuesta = await login(datos);

          if (respuesta.rows.length == 0) {
            res.writeHead(401, {
              'Content-Type': 'application/json'
            });
            res.end(`Ha ocurrido un error inesperado.`);
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(respuesta));
          }

        } catch (error) {
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(`Ha ocurrido un error inesperado.`);

        }
      });
    }

  })
  .listen(3000, () => {
    console.log("Escuchando el puerto 3000.");
  });