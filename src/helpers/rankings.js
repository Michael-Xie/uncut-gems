const getRankings = (participants, bets, user_bets, scores, parlays) => {

  const results = {}
  participants.map(participant => {
    results[participant.user_name] = 0
  })

  // --- validate bets ---
  bets.map(bet => {
    const score = scores.filter(score => {
      if (score.game_id === bet.game_id)
        return score
    })[0]
    // keys -> {type, parlay_id, game_id}
    if (bet.type === 'pickem') {
      // check who is in front.
      const difference = score.home_total - score.away_total
      let lead; 
      if (difference > 0)  lead = 'home'
      else if (difference) lead = 'away'
      else                 lead = 'none'
      // check the user_bets
      user_bets.map(user_bet => {
        if (user_bet.selection === lead &&
            user_bet.bet_id    === bet.id) {
          results[user_bet.user_id] += 50
        }
        else {
          results[user_bet.user_id] += 0
        }
      })
    }

    if (bet.type === 'points_tf') {
      // filter scores and calculate total.
      const total = score.home_total + score.away_total
      // allocate points based on le division
      let number;
      user_bets.map(user_bet => {
        if (user_bet.selection > 0) {
          if (user_bet.selection - total === 0)
            number = 1000
          else
            number = parseInt(500 / Math.abs(user_bet.selection - total), 10)
          results[user_bet.user_id] += number
        }
  
      })            
    }

    if (bet.type === 'points_th') {
      const total = score.home_first + score.home_second + 
                    score.away_first + score.away_second
      let number;
      user_bets.map(user_bet => {
        if (user_bet.selection > 0) {
          if (user_bet.selection - total === 0)
            number = 500
          else 
            number = parseInt(500 / Math.abs(user_bet.selection - total), 10)
          results[user_bet.user_id] += number
         }
      })            
    }
  })

  return results
}

module.exports = getRankings
