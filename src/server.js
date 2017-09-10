var koa = require("koa");
var app = new koa();
import serve from "koa-static";
var React = require("react");
var ReactDOMServer = require("react-dom/server");
import App from "./app/App";

console.log(process.cwd());

console.log(__dirname + "/client");
app.use(serve(__dirname + "/client"));

// app.use(async ctx => {
//   //   console.log("ctx", ctx);

//   ctx.body = ReactDOMServer.renderToStaticMarkup(<App ctx={ctx} />);
// });

app.listen(process.env.PORT || 8000);
