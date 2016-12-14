package com.github.pschlette.edeck

import java.util.UUID
import org.scalatra._

class EdeckServlet extends EdeckStack {

  get("/") {
    <html>
      <body>
        <h1>Hello, world!</h1>
        <form method="POST" action="decks">
          <p>
            This is the e-dom editor for collaborative kingdoms.<br/>
            Click the button to generate a new deck: <input type="submit"/>
          </p>
        </form>
      </body>
    </html>
  }

  post("/decks") {
    val newDeckId = UUID.randomUUID.toString
    <p>You posted to /decks. Your new deck id would be {newDeckId} if that was a thing yet.</p>
  }

  get("/decks/:id") {
    <p>You're viewing the deck with id {params("id")} - or, you WOULD be, if that was a thing.</p>
  }
}
