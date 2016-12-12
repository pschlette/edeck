package com.github.pschlette.edeck

import org.scalatra._

class EdeckServlet extends EdeckStack {

  get("/") {
    <html>
      <body>
        <h1>Hello, world!</h1>
        Say <a href="hello-scalate">hello to Scalate</a>.
      </body>
    </html>
  }

}
