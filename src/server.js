var koa = require("koa");
var app = new koa();
import serve from "koa-static";
var React = require("react");
var ReactDOMServer = require("react-dom/server");
import App from "./app/App";

app.use(serve(__dirname + "/client"));

app.use(async ctx => {
  ctx.body = ReactDOMServer.renderToStaticMarkup(
    <html>
      <head>
        <title>Site</title>
        <script src="/bundle.js" />
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <App ctx={ctx} />
      </body>
    </html>
  );
});

app.listen(process.env.PORT || 8000);
