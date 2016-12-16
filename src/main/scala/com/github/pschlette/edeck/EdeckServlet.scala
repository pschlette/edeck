package com.github.pschlette.edeck

import java.util.UUID
import com.redis.RedisClient
import org.scalatra._

import com.github.pschlette.edeck.RedisHelpers.deckTimestampKey

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
    val timestamp = System.currentTimeMillis

    // We're using redis to store data permanently even though that might be a bad idea.
    // So, we don't want to expire our keys (because then we'd lose all that great historical deck
    // data), but we do want to keep track of when a deck was created in case some day we want to
    // archive all the really old decks...or something.
    val r = new RedisClient("localhost", 6379)

    r.set(deckTimestampKey(newDeckId), timestamp)

    <p>You posted to /decks. Your new deck id would be {newDeckId} if that was a thing yet.</p>
  }

  get("/decks/:id") {
    <p>You're viewing the deck with id {params("id")} - or, you WOULD be, if that was a thing.</p>
  }
}
