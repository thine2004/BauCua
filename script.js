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
            document.getElementById("gameContainer").style.animation = "winEffect 0.5s";
        } else {
            document.getElementById("loseSound").play();
            document.getElementById("gameContainer").style.animation = "loseEffect 0.5s";
        }

    }, 500);
});
document.getElementById("resetGame").addEventListener("click", () => {
    // Đặt lại hình ảnh xúc xắc về dấu "?"
    document.getElementById("dice1").src = "images/question.png";
    document.getElementById("dice2").src = "images/question.png";
    document.getElementById("dice3").src = "images/question.png";

    // Đặt lại toàn bộ ô cược về 0
    let bets = document.querySelectorAll(".bet-amount");
    bets.forEach(bet => {
        bet.value = "";
    });

    // Xóa thông báo kết quả
    document.getElementById("result").innerText = "";

    // Xóa hiệu ứng thắng/thua nếu có
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.classList.remove("win-background", "lose-background");

    // Reset tiền về 1000 xu và lưu lại
    playerMoney = 1000;
    updateMoney();

    // Reset số trận đã chơi về 0
    gameCount = 0;
    localStorage.setItem("gameCount", gameCount);
    document.getElementById("gameCount").innerText = gameCount;
});

let gameCount = localStorage.getItem("gameCount") ? parseInt(localStorage.getItem("gameCount")) : 0;
document.getElementById("gameCount").innerText = gameCount;

document.getElementById("rollDice").addEventListener("click", () => {
    gameCount++;
    localStorage.setItem("gameCount", gameCount);
    document.getElementById("gameCount").innerText = gameCount;
});

function updateMoney() {
    document.getElementById("money").innerText = playerMoney;
    localStorage.setItem("playerMoney", playerMoney);
}
