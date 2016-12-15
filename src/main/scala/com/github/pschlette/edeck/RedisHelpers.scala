package com.github.pschlette.edeck

object RedisHelpers {
  def withNamespace(keyName: String) = s"edeck:${keyName}"
  def createDeckKey(keyName: String, deckId: String) = withNamespace(s"${keyName}:${deckId}")
}
