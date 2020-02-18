const betTypes = [{
  betName: 'Pickem',
  explanation: 'Select the winner of the game',
  betData: { type: "pickem", selected: game.bets[0].selected }
},
{
  betName: 'Total Points',
  explanation: 'Select the combined total of points scored this game.',
  // betData: { type: "points_tf", selected: game.bets[1].selected }
},
{
  betName: 'Points By Half',
  explanation: 'Select the combined total of points scored by half-time.',
  // betData: { type: "points_th", selected: game.bets[2].selected }
},
{
  betName: 'Race to 10',
  explanation: 'Select which team will score 10 points first.',
  // betData: { type: "race_to_10", selected: game.bets[3].selected }
},
{
  betName: 'Race to 100',
  explanation: 'Select which team will score 100 points first.',
  // betData: { type: "race_to_100", selected: game.bets[4].selected }
}
]

module.exports = betTypes;