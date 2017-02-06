package com.github.pschlette.edeck

import java.util.UUID
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization.write
import org.scalatra._
import org.scalatra.json.JacksonJsonSupport

import RedisHelpers.{
  createClient,
  KingdomCardsKey,
  deckTimestampKey,
  deckProposedCardsKey,
  deckHistoryKey
}

case class DeckChangeRequest(cardName: String, user: String)
case class HistoryItem(action: String, cardName: String, user: String, timestamp: Long, random: Boolean)

object DeckActions {
  val Add = "add"
  val Remove = "remove"
}

class EdeckServlet extends EdeckStack with JacksonJsonSupport with CorsSupport  {
  protected implicit lazy val jsonFormats = DefaultFormats

  def getDeckState(deckId: String): Map[String, Any] = {
    val r = createClient()
    val proposedCardsSet = r.smembers(deckProposedCardsKey(deckId))
    val proposedCardList = proposedCardsSet.getOrElse(Set()).flatten.toList

    val historyList = r.lrange(deckHistoryKey(deckId), 0, -1)

    Map("cards" -> proposedCardList, "history" -> historyList)
  }

  // Return all possible kingdom cards as JSON
  // This is a lot of work, computationally speaking; maybe we should just be returning the raw JSON.
  // Where's the fun in that though. Where.
  get("/cards") {
    contentType = formats("json")
    val r = createClient()
    val rawCards = r.lrange(KingdomCardsKey, 0, -1).getOrElse(List())
    // The kingdom cards are stored as serialized JSON blobs, so we'll need to parse them into
    // JSON (before promptly re-serializing them to send over the wire...)
    rawCards.flatMap(_.map(parse(_)))
  }

  // create a new deck and redirect user to webpage showing it
  post("/decks") {
    val newDeckId = UUID.randomUUID.toString
    val timestamp = System.currentTimeMillis

    // We're using redis to store data permanently even though that might be a bad idea.
    // So, we don't want to expire our keys (because then we'd lose all that great historical deck
    // data), but we do want to keep track of when a deck was created in case some day we want to
    // archive all the really old decks...or something.
    val r = createClient()
    r.set(deckTimestampKey(newDeckId), timestamp)

    contentType = formats("json")
    getDeckState(newDeckId)
  }

  // get a json representation of a deck
  get("/decks/:id.json") {
    val deckId = params("id")
    val r = createClient()
    contentType = formats("json")
    getDeckState(deckId)
  }
  
  // add a card to a deck, return new state of deck (json)
  post("/decks/:id/add") {
    val deckId = params("id")
    val parsedBody = parse(request.body)
    val maybeChangeRequest = parsedBody.extractOpt[DeckChangeRequest]
    val r = createClient()

    maybeChangeRequest.filter(cr => !r.sismember(deckProposedCardsKey(deckId), cr.cardName)).foreach(changeRequest => {
      // add card to deck
      r.sadd(deckProposedCardsKey(deckId), changeRequest.cardName)

      // add history entry
      val historyItem = HistoryItem(DeckActions.Add, changeRequest.cardName, changeRequest.user, System.currentTimeMillis, false)
      val serializedHistoryItem = write(historyItem)
      r.rpush(deckHistoryKey(deckId), serializedHistoryItem)

      println(s"Received change request from ${changeRequest.user} to add ${changeRequest.cardName}.")
    })

    contentType = formats("json")
    getDeckState(deckId)
  }

  // remove a card from a deck, return new state of deck (json)
  post("/decks/:id/remove") {
    val deckId = params("id")
    val parsedBody = parse(request.body)
    val maybeChangeRequest = parsedBody.extractOpt[DeckChangeRequest]
    val r = createClient()

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
