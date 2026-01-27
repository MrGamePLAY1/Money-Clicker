// Creating the logger
const log = {
    log: (message) => {
        console.log(`[${new Date().toLocaleTimeString()}] ${message}`); 
    }
};

// Game State
let money = 0;
let clickPower = 0.01;

// Updgrades
let cps = 0; // clicks per second (Value)
let cps_display = 0; // clicks per second (Display)

// Upgrade Costs
let clickerupgradeCost = 0.1;
let fastClickerUpgradeCost = 1;
let printerUpgradeCost = 15;


// Elements
const moneyDisplay = document.getElementById('money-display');
const clickBtn = document.getElementById('click-btn');
const cpsUpgradeCostSpan = document.getElementById('cps-upgrade-cost');
const cpsUpgradeBtn = document.getElementById('cps-upgrade');
const fastClickerUpgradeBtn = document.getElementById('fast-clicker-upgrade');
const fastClickerUpgradeCostSpan = document.getElementById('fast-clicker-upgrade-cost');
const printerUpgradeCostSpan = document.getElementById('printer-upgrade-cost');
const cpsDisplay = document.getElementById('cps-display');
const saveBtn = document.getElementById('save-btn');
const loadSaveBtn = document.getElementById('load-save-btn');
const alertBox = document.getElementById('alert');
const clickSound = new Audio('sounds/$$.mp3');
const printerUpgradeBtn = document.getElementById('printer-upgrade');
const coinDiv = document.getElementById('coin-container');

// Make it rain 
function rain() {
  for(let i=0; i<30; i++) {
    setTimeout(() => {
      const coin = document.createElement('div');
      coin.className = 'coin';
      coin.style.left = Math.random() * 100 + 'vw';
      coin.style.animationDuration = (Math.random() * 1 + 1) + 's';
      document.getElementById('coin-container').appendChild(coin);
      setTimeout(() => coin.remove(), 2000);
    }, i * 50);
  }
}

// Message showing loaded save
function displayLoadSaveMessage() {
  alertBox.classList.remove('hidden');
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}

// alert when game saved
function displayMessage() {
 alert("Game Successfully Saved!");
}

// play sound
function playClickSound() {
  clickSound.currentTime = 0; // Rewind to the start
  clickSound.play();
}

// Auto save every 2 minutes
function autoSave() {
  const autoSave = {
    money: money,
    clickPower: clickPower,
    cps: cps,
    cps_display: cps_display,
    clickerupgradeCost: clickerupgradeCost,
    fastClickerUpgradeCost: fastClickerUpgradeCost
  };
  localStorage.setItem('moneyClickerSave', JSON.stringify(autoSave));
  sessionStorage.setItem('moneyClickerSave', JSON.stringify(autoSave));
  log.log('Auto Saved Game: $' + money.toFixed(2));
  }

// Load Save function
function loadGame() {
  const savedData = sessionStorage.getItem('moneyClickerSave') || localStorage.getItem('moneyClickerSave');
  if (savedData) {
    const gameSaveData = JSON.parse(savedData);
    money = gameSaveData.money;
    clickPower = gameSaveData.clickPower;
    cps = gameSaveData.cps;
    cps_display = gameSaveData.cps_display;
    clickerupgradeCost = gameSaveData.clickerupgradeCost;
    fastClickerUpgradeCost = gameSaveData.fastClickerUpgradeCost;
    updateUI();
    log.log('Game Loaded: $' + money.toFixed(2));
    displayLoadSaveMessage();
  } else {
    log.log('No save data found.');
  }
}

// Save Game function
function saveGame() {
  const gameSaveData = {
    money: money,
    clickPower: clickPower,
    cps: cps,
    cps_display: cps_display,
    clickerupgradeCost: clickerupgradeCost,
    fastClickerUpgradeCost: fastClickerUpgradeCost
  };
  localStorage.setItem('moneyClickerSave', JSON.stringify(gameSaveData));
  sessionStorage.setItem('moneyClickerSave', JSON.stringify(gameSaveData));
  log.log('Game Saved: $' + money.toFixed(2));
  
}

// Save Button Logic
saveBtn.addEventListener('click', saveGame);

// Load Save Button Logic
loadSaveBtn.addEventListener('click', loadGame);

// Logic
clickBtn.addEventListener('click', () => {
    money += clickPower;
    moneyDisplay.innerText = money.toLocaleString();
    rain();
});

// transform the money image when clicked
clickBtn.addEventListener('click', () => {
    const moneyBag = document.querySelector('#dollar');
    // Remove animation so it can restart
    moneyBag.classList.remove('pop');

    // Force browser to reset animation
    void moneyBag.offsetWidth;

    // Re-add animation
    moneyBag.classList.add('pop');
});

// CPS Upgrade Logic
cpsUpgradeBtn.addEventListener('click', () => {
    if (money >= clickerupgradeCost) {
        money -= clickerupgradeCost;
        cps += 1; // Increase CPS by 1
        clickPower += 0.01; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        clickerupgradeCost *= 1.15; // Increase cost
        // Update CPS display
        cpsDisplay.textContent = cps_display += 1;
        updateUI();
    }
});

// fast Clicker Upgrade Logic
fastClickerUpgradeBtn.addEventListener('click', () => {
    if (money >= fastClickerUpgradeCost) {
        money -= fastClickerUpgradeCost;
        cps += 2; // Increase CPS by 2
        clickPower += 0.02; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        fastClickerUpgradeCost *= 1.3; // Increase cost
        // Update CPS display
        cpsDisplay.textContent = cps_display += 3;
        updateUI();
    }
});

// Printer Upgrade Logic
printerUpgradeBtn.addEventListener('click', () => {
    if (money >= printerUpgradeCost) {
        money -= printerUpgradeCost;
        cps += 10; // Increase CPS by 5
        clickPower += 0.1; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        printerUpgradeCost *= 1.3; // Increase cost
        // Update CPS display
        cpsDisplay.textContent = cps_display += 10;
        updateUI();
      }
    }
  );

// Auto income
setInterval(() => {
  money += cps * 0.01;
  updateUI();
}, 1000);

setInterval(function() {
  autoSave();
}, 120000); // 120,000 milliseconds = 2 minutes


// Functions
function updateUI() {
  moneyDisplay.textContent = money.toFixed(2);

  // Show current auto-clicker cost
  cpsUpgradeCostSpan.textContent = clickerupgradeCost.toFixed(2);
  fastClickerUpgradeCostSpan.textContent = fastClickerUpgradeCost.toFixed(2);
  printerUpgradeCostSpan.textContent = printerUpgradeCost.toFixed(2);

  // Unlock auto clicker
  if (money >= clickerupgradeCost) {
    cpsUpgradeBtn.style.display = 'flex';
  }

  // Unlock fast clicker
    if (money >= fastClickerUpgradeCost) {
      fastClickerUpgradeBtn.style.display = 'flex';
    }

    // Unlock printer upgrade
    if (money >= printerUpgradeCost) {
      printerUpgradeBtn.style.display = 'flex';
    }
}

// Populate UI on load
updateUI();