const diceImages = ["bau", "cua", "tom", "ca", "nai", "ga"];
let playerMoney = localStorage.getItem("playerMoney") ? parseInt(localStorage.getItem("playerMoney")) : 1000;

document.getElementById("money").innerText = playerMoney;

document.getElementById("rollDice").addEventListener("click", () => {
    let gameContainer = document.getElementById("gameContainer");
    let bets = document.querySelectorAll(".bet-amount");
    let totalBet = 0;
    let betAmounts = {};

    bets.forEach(bet => {
        let amount = parseInt(bet.value) || 0;
        let betType = bet.parentElement.getAttribute("data-bet");
        betAmounts[betType] = amount;
        totalBet += amount;
    });

    if (totalBet > playerMoney) {
        alert("Bạn không có đủ tiền!");
        return;
    }

    playerMoney -= totalBet;
    updateMoney();

    document.getElementById("diceSound").play();

    let dice1 = diceImages[Math.floor(Math.random() * 6)];
    let dice2 = diceImages[Math.floor(Math.random() * 6)];
    let dice3 = diceImages[Math.floor(Math.random() * 6)];

    setTimeout(() => {
        document.getElementById("dice1").src = `images/${dice1}.png`;
        document.getElementById("dice2").src = `images/${dice2}.png`;
        document.getElementById("dice3").src = `images/${dice3}.png`;

        let results = [dice1, dice2, dice3];
        let winnings = 0;

        for (let bet in betAmounts) {
            if (results.includes(bet)) {
                let count = results.filter(r => r === bet).length;
                winnings += betAmounts[bet] * (1 + count);
            }
        }

        playerMoney += winnings;
        updateMoney();

        if (winnings > 0) {
            document.getElementById("winSound").play();
            gameContainer.classList.add("win-background");
            setTimeout(() => gameContainer.classList.remove("win-background"), 1500);
        } else {
            document.getElementById("loseSound").play();
            gameContainer.classList.add("lose-background");
            setTimeout(() => gameContainer.classList.remove("lose-background"), 1500);
        }

    }, 500);
});

function updateMoney() {
    document.getElementById("money").innerText = playerMoney;
    localStorage.setItem("playerMoney", playerMoney);
}
