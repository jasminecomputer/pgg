import Empirica from "meteor/empirica:core";

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("cumulativePayoff", 0);
  });
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  round.set("totalContributions", 0);
  round.set("totalReturns", 0);
  round.set("payoff", 0);
  game.players.forEach((player, i) => {
    player.round.set("endowment", game.treatment.endowment);
    player.round.set("punishedBy", []);
    player.round.set("punished", []);
    player.round.set("contribution", 0);
  });
});

// onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  if (stage.name == "contribution") {
    computePayoff(game, round);
  } //player.stage.set values but wait to update until round end
  if (stage.name == "punishment") {
    computePunishmentCosts(game, round);
    computeIndividualPayoff(game, round);
  }
  /*
  game.players.forEach((player) => {
    if (stage.name == "punishment") {
      const punished = player.round.get("punished");
      player.set("punished", [...player.get("punished"), punished]);
      const punishedBy = player.round.get("punishedBy");
      player.set("punishedBy", [...player.get("punishedBy"), punishedBy]);
    }
  });*/
});

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {
  game.players.forEach((player) => {
    const prevCumulativePayoff = player.get("cumulativePayoff");
    const roundPayoff = player.round.get("roundPayoff");
    const newCumulativePayoff = Math.round(prevCumulativePayoff + roundPayoff);
    player.set("cumulativePayoff", newCumulativePayoff);
  });
});

// onGameEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {});

// compute each players' payoffs
function computePayoff(game, round) {
  /*const multiplier = game.treatment.multiplier*/
  const multiplier = 1.3;
  game.players.forEach((player) => {
    const contribution = player.round.get("contribution");
    const totalContributions = round.get("totalContributions");
    const newTotalContributions =
      parseFloat(totalContributions) + parseFloat(contribution);
    round.set("totalContributions", newTotalContributions);
  });
  const multipliedReturns = Math.round(
    round.get("totalContributions") * multiplier
  );
  round.set("totalReturns", multipliedReturns);
  console.log(round.get("totalReturns"));
  const totalReturns = round.get("totalReturns");
  const payoff = Math.round(totalReturns / game.players.length);
  round.set("payoff", payoff);
}

function computePunishmentCosts(game, round) {
  game.players.forEach((player) => {
    const punished = player.round.get("punished");
    const punishedBy = [];
    const cost = punished.length;
    player.round.set("costs", cost);
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerPunished = otherPlayer.round.get("punished");
      console.log(otherPlayerPunished);
      console.log("player", player._id);
      if (otherPlayerPunished.includes(player._id)) {
        console.log("true,", otherPlayer._id, "punishes", player._id);
        punishedBy.push(otherPlayer._id);
        console.log(punishedBy);
      }
    });
    player.round.set("punishedBy", punishedBy);
    const penalties = parseFloat(punishedBy.length) * parseFloat(3);
    player.round.set("penalties", penalties);
    /*punish the other players- maybe need to set a dictionary that stores who punished who? */
  });
}

function computeIndividualPayoff(game, round) {
  game.players.forEach((player) => {
    const payoff = round.get("payoff");
    const contribution = player.round.get("contribution");
    const remainingEndowment =
      parseFloat(game.treatment.endowment) - parseFloat(contribution);
    const penalties = player.round.get("penalties");
    const costs = player.round.get("costs");
    const roundPayoff =
      parseFloat(payoff) +
      parseFloat(remainingEndowment) -
      parseFloat(penalties) -
      parseFloat(costs);
    player.round.set("roundPayoff", roundPayoff);
  });
}

// ===========================================================================
// => onSet, onAppend and onChange ==========================================
// ===========================================================================

// onSet, onAppend and onChange are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.

// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.

// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// onSet is called when the experiment code call the .set() method
// on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onSet(
//   (
//     game,
//     round,
//     stage,
//     player, // Player who made the change
//     target, // Object on which the change was made (eg. player.set() => player)
//     targetType, // Type of object on which the change was made (eg. player.set() => "player")
//     key, // Key of changed value (e.g. player.set("score", 1) => "score")
//     value, // New value
//     prevValue // Previous value
//   ) => {
//     // // Example filtering
//     // if (key !== "value") {
//     //   return;
//     // }
//   }
// );

// // onAppend is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend(
//   (
//     game,
//     round,
//     stage,
//     player, // Player who made the change
//     target, // Object on which the change was made (eg. player.set() => player)
//     targetType, // Type of object on which the change was made (eg. player.set() => "player")
//     key, // Key of changed value (e.g. player.set("score", 1) => "score")
//     value, // New value
//     prevValue // Previous value
//   ) => {
//     // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//     //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
//   }
// );

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange(
//   (
//     game,
//     round,
//     stage,
//     player, // Player who made the change
//     target, // Object on which the change was made (eg. player.set() => player)
//     targetType, // Type of object on which the change was made (eg. player.set() => "player")
//     key, // Key of changed value (e.g. player.set("score", 1) => "score")
//     value, // New value
//     prevValue, // Previous value
//     isAppend // True if the change was an append, false if it was a set
//   ) => {
//     // `onChange` is useful to run server-side logic for any user interaction.
//     // Note the extra isAppend boolean that will allow to differenciate sets and
//     // appends.
//     Game.set("lastChangeAt", new Date().toString());
//   }
// );

// // onSubmit is called when the player submits a stage.
// Empirica.onSubmit(
//   (
//     game,
//     round,
//     stage,
//     player // Player who submitted
//   ) => {}
// );
