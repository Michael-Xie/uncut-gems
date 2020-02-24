const teamData = (team) => {
  team = team.replace(/\s/g, '_')
  const data = {
    Atlanta_Hawks: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419be4a6515b1e0ad75a58.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/atlanta.png",
      colors: "255,255,255, 0.701"
    },
    Boston_Celtics: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c6aa6515b1e0ad75a61.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/boston.png",
      colors: "1,130,72, 0.701"
    },
    Brooklyn_Nets: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c7ba6515b1e0ad75a62.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/brooklyn.png",
      colors: "0,0,0, 0.701"
    },
    Charlotte_Hornets: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419bd7a6515b1e0ad75a57.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/charlotte.png",
      colors: "28,14,93, 0.701"
    },
    Chicago_Bulls: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419cf6a6515b1e0ad75a6b.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/chicago.png",
      colors: "210,20,58, 0.701"
    },
    Cleveland_Cavaliers: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c8da6515b1e0ad75a63.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/cleveland.png",
      colors: "134,0,56, 0.701"
    },
    Dallas_Mavericks: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419cd6a6515b1e0ad75a68.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/dallas.png",
      colors: "111, 200, 111, 0.701"
    },
    Denver_Nuggets: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419b70a6515b1e0ad75a50.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/denver.png",
      colors: "253,184,39, 0.701"
    },
    Detroit_Pistons: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c4ca6515b1e0ad75a5f.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/detroit.png",
      colors: "0,103,177, 0.701"
    },
    Golden_State_Warriors: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419ce2a6515b1e0ad75a69.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/golden-state.png",
      colors: "25,100,183, 0.701"
    },
    Houston_Rockets: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419ceda6515b1e0ad75a6a.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/houston.png",
      colors: "211,13,76, 0.701"
    },
    Indiana_Pacers: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419b8da6515b1e0ad75a52.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/indiana.png",
      colors: "0,45,98, 0.701"
    },
    Los_Angeles_Clippers: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c59a6515b1e0ad75a60.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/LA.png",
      colors: "18,108,181, 0.701"
    },
    Los_Angeles_Lakers: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419d0aa6515b1e0ad75a6c.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/LA.png",
      colors: "85,38,130, 0.701"
    },
    Memphis_Grizzlies: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c00a6515b1e0ad75a5a.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/memphis.png",
      colors: "35,55,91, 0.701"
    },
    Miami_Heat: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419cafa6515b1e0ad75a65.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/miami.png",
      colors: "242,110,63, 0.701"
    },
    Milwaukee_Bucks: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419ba7a6515b1e0ad75a54.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/milwakee.png",
      colors: "0,71,28, 0.701"
    },
    Minnesota_Timberwolves: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419bc5a6515b1e0ad75a56.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/minneapolis.png",
      colors: "5,34,49, 0.701"
    },
    New_Orleans_Pelicans: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419b9ba6515b1e0ad75a53.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/new_orleans.png",
      colors: "182,152,87, 0.701"
    },
    New_York_Knicks: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419cc8a6515b1e0ad75a67.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/new_york.png",
      colors: "246,131,40, 0.701"
    },
    Oklahoma_City_Thunder: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c20a6515b1e0ad75a5c.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/okc.png",
      colors: "8,126,194, 0.701"
    },
    Orlando_Magic: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419b7da6515b1e0ad75a51.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/orlando.png",
      colors: "197,204,208, 0.701"
    },
    Philadelphia_76ers: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419ca3a6515b1e0ad75a64.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/orlando.png",
      colors: "237,21,75, 0.701"
    },
    Phoenix_Suns: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419d52a6515b1e0ad75a6d.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/pheonix.png",
      colors: "250,161,33, 0.701"
    },
    Portland_Trail_Blazers: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c2fa6515b1e0ad75a5d.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/portland.png",
      colors: "224,56,62, 0.701"
    },
    Sacramento_Kings: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c3da6515b1e0ad75a5e.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/sacramento.png",
      colors: "58,63,148, 0.701"
    },
    San_Antonio_Spurs: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419cbca6515b1e0ad75a66.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/san_antonio.png",
      colors: "196,206,212, 0.701"
    },
    Toronto_Raptors: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419bf3a6515b1e0ad75a59.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/toronto.png",
      colors: "198,15,48, 0.701"
    },
    Utah_Jazz: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419bb6a6515b1e0ad75a55.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/utah.png",
      colors: "11,35,64, 0.701"
    },
    Washington_Wizards: {
      logo: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_Logos/58419c12a6515b1e0ad75a5b.png",
      arena: "https://raw.githubusercontent.com/pizzani/uncut-gems/master/images/nba_citys/washington.png",
      colors: "208,60,71, 0.701"
    }

  }
  return data[team]
}

module.exports = teamData
