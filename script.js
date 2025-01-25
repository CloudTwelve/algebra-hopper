let score = 0;

let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");

let jump = () => {
    if (character.classList != "animate") {
    character.classList.add("animate");
    }
    setTimeout(() => {
        character.classList.remove("animate");
    }, 500);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

setTimeout(() => {
      obstacle.style.animation = "obstacle 1s infinite linear";
    }, 3000);

setInterval(() => {
    document.getElementById("score").innerText = score;
}, 10);
    
let checkDead = setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
        lightBoxOpen();
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
    }
}, 10);

let lightBoxOpen = () => {
    document.getElementById("Lightbox").style.display = "block";
    let alg = document.getElementById("question-text");
    alg.innerText = genRandomAlg();
}

let lightBoxClose = () => {
    document.getElementById("Lightbox").style.display = "none";
    setTimeout(() => {
      obstacle.style.animation = "obstacle 1s infinite linear";
    }, 3000);
    obstacle.style.display = "block";
}

let submitAnswer = () => {
    let answer = document.getElementById("answer-text");
    let alg = document.getElementById("question-text");
    if (algObject[alg.innerText] === parseInt(answer.value)) {
        score += 10;
        alert("Correct! +10 points");
    } else {
        alert("Incorrect! +0 points");
    }
    answer.value = "";
    lightBoxClose();
}

let algObject = {
    "x + 9 = 23": 14,
    "2x - 4 = 10": 7,
    "3x + 5 = 20": 5,
    "4x - 8 = 12": 5,
    "5x + 10 = 35": 5,
    "x/2 + 3 = 8": 10,
    "7x - 14 = 0": 2,
    "2x + 3x - 5 = 20": 5,
    "10x - 6 = 24": 3,
    "8x + 2 = 50": 6,
    "6x/3 + 4 = 10": 9,
    "x/4 - 5 = 3": 32,
    "7x + 8 = 2x + 33": 5,
    "5(x - 2) = 3x + 6": 8,
    "2(x - 4) = x + 2": 10,
    "4(x - 3) = 8": 5,
    "(x + 2)/3 = 4": 10,
    "7x + 3 = 24": 3,
    "8x - 6 = 10": 2,
    "x/5 + 7 = 12": 25,
    "3x + 2 = 14": 4,
    "10x - 5 = 35": 4,
    "x/3 - 4 = 2": 18,
    "5x + 20 = 45": 5,
    "9x - 15 = 12": 3,
    "x/6 + 5 = 8": 18,
    "6x - 7 = 5x + 10": 17,
    "12x + 8 = 20": 1,
    "15x - 5 = 40": 3,
    "20x + 10 = 50": 2
};

let ownedItems = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
};

let genRandomAlg = () => {
    let keys = Object.keys(algObject);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
}

let items = document.getElementsByClassName("shop-item");

for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.addEventListener("click", () => {
        let color = window.getComputedStyle(item).background;
        let itemNum = i;
        if (ownedItems[itemNum] == true) {
            document.getElementById("character").style.background = color;
        } else if (score >= parseInt(item.innerText)) {
            document.getElementById("character").style.background = color;
            score -= parseInt(item.innerText);
            ownedItems[itemNum] = true;
        } else {
            alert("Not enough points!");
        }
    })
}