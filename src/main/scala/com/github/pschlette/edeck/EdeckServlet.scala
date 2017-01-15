package com.github.pschlette.edeck

import com.redis.RedisClient
import java.util.UUID
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization.write
import org.scalatra._
import org.scalatra.json.JacksonJsonSupport

import com.github.pschlette.edeck.RedisHelpers.{deckTimestampKey, deckProposedCardsKey, deckHistoryKey}

case class DeckChangeRequest(cardName: String, user: String)
case class HistoryItem(action: String, cardName: String, user: String, timestamp: Long, random: Boolean)

object DeckActions {
  val Add = "add"
  val Remove = "remove"
}

class EdeckServlet extends EdeckStack with JacksonJsonSupport {
  protected implicit lazy val jsonFormats = DefaultFormats

  def getDeckState(deckId: String): Map[String, Any] = {
    val r = new RedisClient("localhost", 6379)
    val proposedCardsSet = r.smembers(deckProposedCardsKey(deckId))
    val proposedCardList = proposedCardsSet.getOrElse(Set()).flatten.toList

    val historyList = r.lrange(deckHistoryKey(deckId), 0, -1)

    Map("cards" -> proposedCardList, "history" -> historyList)
  }

  get("^/(decks)?$".r) {
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

    redirect(s"/decks/${newDeckId}")
  }

  get("/decks/:id") {
    val deckId = params("id")
    val r = new RedisClient("localhost", 6379)
    val timestamp = r.get(deckTimestampKey(deckId)).getOrElse(0)
    <p>You're viewing the deck with id {deckId}. It was created at ${timestamp}.</p>
  }
  
  post("/decks/:id/add") {
    val deckId = params("id")
    val parsedBody = parse(request.body)
    val maybeChangeRequest = parsedBody.extractOpt[DeckChangeRequest]
    val r = new RedisClient("localhost", 6379)

    maybeChangeRequest.filter(cr => !r.sismember(deckProposedCardsKey(deckId), cr.cardName)).foreach(changeRequest => {
      // add card to deck
      r.sadd(deckProposedCardsKey(deckId), changeRequest.cardName)

      // add history entry
      val historyItem = HistoryItem(DeckActions.Add, changeRequest.cardName, changeRequest.user, System.currentTimeMillis, false)
      val serializedHistoryItem = write(historyItem)
      r.rpush(deckHistoryKey(deckId), serializedHistoryItem)

      println(s"Received change request from ${changeRequest.user} to add ${changeRequest.cardName}")
    })

    contentType = formats("json")
    getDeckState(deckId)
  }

  post("/decks/:id/remove") {
    val deckId = params("id")
    val parsedBody = parse(request.body)
    val maybeChangeRequest = parsedBody.extractOpt[DeckChangeRequest]
    val r = new RedisClient("localhost", 6379)

    maybeChangeRequest.filter(cr => r.sismember(deckProposedCardsKey(deckId), cr.cardName)).foreach(cr => {
      // remove card from deck
      r.srem(deckProposedCardsKey(deckId), cr.cardName)

      // add history entry
      val historyItem = HistoryItem(DeckActions.Remove, cr.cardName, cr.user, System.currentTimeMillis, false)
      val serializedHistoryItem = write(historyItem)
      r.rpush(deckHistoryKey(deckId), serializedHistoryItem)

      println(s"Received change request from ${cr.user} to remove ${cr.cardName}")
    })

    contentType = formats("json")
    getDeckState(deckId)
  }
}
