package com.github.pschlette.edeck

object RedisHelpers {
  private def withNamespace(keyName: String) = s"edeck:${keyName}"
  private def createDeckKey(keyName: String, deckId: String) = withNamespace(s"${keyName}:${deckId}")

  val KingdomCardsKey = withNamespace("kingdomCards")
  def deckTimestampKey(deckId: String) = createDeckKey("creationTime", deckId)
}
