var koa = require("koa");
var app = new koa();

var React = require("react");
var ReactDOMServer = require("react-dom/server");
import App from "./app/App";

app.use(async ctx => {
  ctx.body = ReactDOMServer.renderToStaticMarkup(<App />);
});

// app.get("/", (req, res) => {
//   //   res.send("hi");
//   res.send(ReactDOMServer.renderToStaticMarkup(<App />));
// });

app.listen(process.env.PORT || 8000);
