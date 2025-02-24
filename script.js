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
