package com.github.pschlette.edeck

import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization.write

// This might be useful in application code later.
case class KingdomCard(name: String, cost: String, cardType: String, description: String, set: String)

object KingdomCardSeeder {
  def main(args: Array[String]): Unit = {
    // parse our json full of delicious card data into a Json4s object
    val cardsResourceStream = getClass.getResourceAsStream("/kingdom-card-data.json")
    val rawCardsJson = scala.io.Source.fromInputStream(cardsResourceStream).getLines.mkString
    val parsedCards = parse(rawCardsJson)

    // The JSON should be a single top-level array full of objects representing cards.
    // Extract these cards into the KingdomCard case class
    implicit val formats = DefaultFormats
    val kingdomCards: Option[List[KingdomCard]] = parsedCards match {
      case a: JArray => Some(a.extract[List[KingdomCard]])
      case _ => None
    }

    // Serialize and insert each kingdom card into a set in redis
    val r = RedisHelpers.createClient()
    val kingdomCardsKey = RedisHelpers.KingdomCardsKey
    r.del(kingdomCardsKey)
    val safeKingdomCards = kingdomCards.getOrElse(List[KingdomCard]())
    for (card <- safeKingdomCards)
      r.sadd(kingdomCardsKey, write(card))

    println(s"Cleared existing kingdom card data and inserted ${safeKingdomCards.length} cards into redis instance at key '${kingdomCardsKey}'")
  }
}
