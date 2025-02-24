const diceImages = ["bau", "cua", "tom", "ca", "nai", "ga"];
let playerMoney = localStorage.getItem("playerMoney") ? parseInt(localStorage.getItem("playerMoney")) : 1000;

document.getElementById("money").innerText = playerMoney;

document.getElementById("rollDice").addEventListener("click", () => {
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

    let diceElements = document.querySelectorAll(".dice");
    diceElements.forEach(dice => {
        dice.style.animation = "rollDice 0.5s ease-in-out";
    });

    setTimeout(() => {
        let dice1 = diceImages[Math.floor(Math.random() * 6)];
        let dice2 = diceImages[Math.floor(Math.random() * 6)];
        let dice3 = diceImages[Math.floor(Math.random() * 6)];

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

        document.getElementById("result").innerText = winnings > 0 ? `Bạn thắng ${winnings} xu!` : "Bạn thua cược!";

        diceElements.forEach(dice => {
            dice.style.animation = "none";
        });
    }, 500);
});

document.getElementById("resetGame").addEventListener("click", () => {
    playerMoney = 1000;
    updateMoney();
});

function updateMoney() {
    document.getElementById("money").innerText = playerMoney;
    localStorage.setItem("playerMoney", playerMoney);
}
