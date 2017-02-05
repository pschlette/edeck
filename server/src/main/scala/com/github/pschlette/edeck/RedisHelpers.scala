package com.github.pschlette.edeck
import com.redis.RedisClient

object RedisHelpers {
  private def withNamespace(keyName: String) = s"edeck:${keyName}"
  private def createDeckKey(keyName: String, deckId: String) = withNamespace(s"${keyName}:${deckId}")

  def createClient() = new RedisClient("localhost", 6379)

  val KingdomCardsKey = withNamespace("kingdomCards")

  def deckTimestampKey(deckId: String) = createDeckKey("creationTime", deckId)
  def deckProposedCardsKey(deckId: String) = createDeckKey("proposedCards", deckId)
  def deckHistoryKey(deckId: String) = createDeckKey("history", deckId)
}
