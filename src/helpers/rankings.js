const getRankings = (participants, bets, user_bets, scores) => {

  const results = {}

  participants.map(participant => {
    results[participant.user_name] = [0,0,0,0,0]
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
        if (user_bet.selection === lead) results[user_bet.user_id][0] = 50
        else                        results[user_bet.user_id][0] = 0
      })
    }

    if (bet.type === 'points_tf') {
      // filter scores and calculate total.
      const total = score.home_total + score.away_total
      // allocate points based on le division
      user_bets.map(user_bet => {
        results[user_bet.user_id][1] = parseInt(1000 / Math.abs(user_bet.selection - total), 10)
      })
    }

    if (bet.type === 'points_ht') {
      const total = score.home_first + score.home_second + 
                    score.away_first + score.away_second
      user_bets.map(user_bet => {
        results[user_bet.user_id][2] = parseInt(500 / Math.abs(user_bet.selection - total), 10)
      })            
    }
  })

  return results
}

module.exports = getRankings
