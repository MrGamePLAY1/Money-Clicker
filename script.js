// Creating the logger - disabled in production
const log = {
    log: (message) => {
        // Production: console logging disabled for security
        // Uncomment below for development only:
        // console.log(`[${new Date().toLocaleTimeString()}] ${message}`); 
    }
};

// Game State
let money = 0;
let clickPower = 0.01;
let last_known_click_time = 0;

// Purchase Count
let buyCount = 0; // Number of CPS upgrades purchased
let fastClickerCount = 0; // Number of Fast Auto Clicker upgrades purchased
let printerCount = 0; // Number of Printer upgrades purchased
let grannyCount = 0; // Number of Granny's Wet Mattress upgrades purchased
let farmCount = 0; // Number of Farm upgrades purchased

// Updgrades
let cps = 0; // clicks per second (Value)
let cps_display = 0; // clicks per second (Display)

// Upgrade Costs
let clickerupgradeCost = 0.1;
let fastClickerUpgradeCost = 1;
let printerUpgradeCost = 15;
let grannyUpgradeCost = 100;
let farmUpgradeCost = 300;


// Elements
const moneyDisplay = document.getElementById('money-display');
const clickBtn = document.getElementById('click-btn');
const cpsUpgradeCostSpan = document.getElementById('cps-upgrade-cost');
const upgradeQuantitySpan = document.getElementById('cps-upgrade-quantity'); // Added for upgrade quantity
const fastQuantitySpan = document.getElementById('fast-upgrade-quantity');
const printerQuantitySpan = document.getElementById('printer-upgrade-quantity');
const grannyQuantitySpan = document.getElementById('granny-upgrade-quantity');
const farmQuantitySpan = document.getElementById('farm-upgrade-quantity');

// Hidden Upgrade Button
const revealUpgradeBtn = document.getElementById('reveal-upgrade-btn');


// Upgrades
const cpsUpgradeBtn = document.getElementById('cps-upgrade');
const fastClickerUpgradeBtn = document.getElementById('fast-clicker-upgrade');
const fastClickerUpgradeCostSpan = document.getElementById('fast-clicker-upgrade-cost');
const printerUpgradeCostSpan = document.getElementById('printer-upgrade-cost');
const cpsDisplay = document.getElementById('cps-display');
const grannyUpgradeBtn = document.getElementById('granny-upgrade');
const grannyUpgradeCostSpan = document.getElementById('granny-upgrade-cost');
const farmUpgradeBtn = document.getElementById('farm-upgrade');
const farmUpgradeCostSpan = document.getElementById('farm-upgrade-cost');



const saveBtn = document.getElementById('save-btn');
const loadSaveBtn = document.getElementById('load-save-btn');
const alertBox = document.getElementById('alert');
const autosaveAlertBox = document.getElementById('autosave-alert');
const clickSound = new Audio('sounds/$$.mp3');
const printerUpgradeBtn = document.getElementById('printer-upgrade');
const coinDiv = document.getElementById('coin-container');

// Show the next hidden upgrade
function revealNextUpgrade() {

}

// upgrades
const upgrades = [
  {
    element: cpsUpgradeBtn,
    revealCondition: () => money >= 0.1,
    revleaved: false
  },
  {
    element: fastClickerUpgradeBtn,
    revealCondition: () => money >= 1,
    revleaved: false
  },
  {
    element: printerUpgradeBtn,
    revealCondition: () => money >= 15,
    revleaved: false 
  },
  {
    element: grannyUpgradeBtn,
    revealCondition: () => money >= 100,
    revleaved: false
  }
];  

function checkAndRevealUpgrades() {
    let nextUpgradeFound = false;

    // First, fully reveal any upgrades that meet their conditions
    for (const upgrade of upgrades) {
        if (upgrade.revealed) continue; // Skip if already revealed

        if (upgrade.revealCondition()) {
            upgrade.element.classList.remove('hidden', 'locked'); // Make it fully visible
            upgrade.revealed = true;
        }
    }

    // Now, find the *next* un-revealed upgrade and show it as locked
    for (const upgrade of upgrades) {
        if (!upgrade.revealed) {
            if (!nextUpgradeFound) {
                // This is the next upgrade to be unlocked
                upgrade.element.classList.remove('hidden');
                upgrade.element.classList.add('locked');
                nextUpgradeFound = true;
            } else {
                // Any subsequent upgrades should remain completely hidden
                upgrade.element.classList.add('hidden');
                upgrade.element.classList.remove('locked');
            }
        }
    }
}

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
    autosaveAlertBox.classList.remove('hidden');
      setTimeout(() => {
      autosaveAlertBox.classList.add('hidden');
    }, 3000);
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
saveBtn.addEventListener('click', () => {
    saveGame();
    displayMessage();
});

// Load Save Button Logic
loadSaveBtn.addEventListener('click', loadGame);

// Click Button - Play Sound
clickBtn.addEventListener('click', (e) => {
    money += clickPower;
    moneyDisplay.innerText = money.toLocaleString();
    playClickSound(); // Play sound on click
    rain();
    createFloatingText(e.clientX, e.clientY, `+$${clickPower.toFixed(2)}`);
});

function createFloatingText(x, y, text) {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.innerText = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    
    // Remove after animation
    setTimeout(() => {
        el.remove();
    }, 1000); // Matches CSS animation duration
}

// transform the money image when clicked
clickBtn.addEventListener('click', () => {
  // Getting the timestamp in which the click was made
    last_known_click_time = Date.now();
    
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
        buyCount += 1; // Increment purchase count
        clickPower += 0.01; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        clickerupgradeCost *= 1.15; // Increase cost
        
        // Update displays
        cpsDisplay.textContent = cps_display += 1;
        upgradeQuantitySpan.textContent = "x" + buyCount; // Update quantity display

        updateUI();
    }
});

// fast Clicker Upgrade Logic
fastClickerUpgradeBtn.addEventListener('click', () => {
    if (money >= fastClickerUpgradeCost) {
        money -= fastClickerUpgradeCost;
        cps += 3; // Increase CPS by 2
        fastClickerCount += 1; // Increment purchase count
        clickPower += 0.03; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        fastClickerUpgradeCost *= 1.3; // Increase cost
        
        // Update displays
        cpsDisplay.textContent = cps_display += 3;
       fastQuantitySpan.textContent = "x" + fastClickerCount; // Update quantity display

        updateUI();
    }
});

// Printer Upgrade Logic
printerUpgradeBtn.addEventListener('click', () => {
    if (money >= printerUpgradeCost) {
        money -= printerUpgradeCost;
        cps += 10; // Increase CPS by 10
        printerCount += 1; // Increment purchase count
        // clickPower += 0.1; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        printerUpgradeCost *= 1.3; // Increase cost

        // Update displays
        cpsDisplay.textContent = cps_display += 10;
        printerQuantitySpan.textContent = "x" + printerCount; // Update quantity display

        updateUI();
      }
    }
  );

// Granny Upgrade Logic
grannyUpgradeBtn.addEventListener('click', () => {
    if (money >= grannyUpgradeCost) {
        money -= grannyUpgradeCost;
        cps += 50; // Increase CPS by 50
        grannyCount += 1; // Increment purchase count
        // clickPower += 0.5; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        grannyUpgradeCost *= 1.3; // Increase cost

        // Update displays
        cpsDisplay.textContent = cps_display += 50;
        grannyQuantitySpan.textContent = "x" + grannyCount; // Update quantity display

        updateUI();
      }
    }
  );

// Farm Upgrade Logic
farmUpgradeBtn.addEventListener('click', () => {
    if (money >= farmUpgradeCost) {
        money -= farmUpgradeCost;
        cps += 100; // Increase CPS by 50
        farmCount += 1; // Increment purchase count
        // clickPower += 0.5; // Increase click power
        moneyDisplay.innerText = money.toLocaleString();
        farmUpgradeCost *= 1.3; // Increase cost

        // Update displays
        cpsDisplay.textContent = cps_display += 100;
        farmQuantitySpan.textContent = "x" + farmCount; // Update quantity display
        updateUI();
      }
    }
  );

// Re-work for money increase using time
function gameRun() {
  money += (Date.now())
}

// Auto income
setInterval(() => {
  // money += cps * 0.01;
  updateUI();
}, 1000);

setInterval(function() {
  autoSave();
}, 60000); // 60,000 milliseconds = 1 minute


// Functions
function updateUI() {
  checkAndRevealUpgrades();

  const now = Date.now();
  const deltaTime = (now - last_known_click_time) / 1000; // in seconds
  last_known_click_time = now;

  // increease based on time passed
  const new_cps = cps/100; // Adjusted for smoother income
  const moneyEarned = new_cps * deltaTime;
  money += moneyEarned;

  // Getting the current cps
  cpsDisplay.textContent = cps_display.toFixed(2); 


  moneyDisplay.textContent = money.toFixed(2);

  // Show current auto-clicker cost
  cpsUpgradeCostSpan.textContent = clickerupgradeCost.toFixed(2);
  fastClickerUpgradeCostSpan.textContent = fastClickerUpgradeCost.toFixed(2);
  printerUpgradeCostSpan.textContent = printerUpgradeCost.toFixed(2);
  grannyUpgradeCostSpan.textContent = grannyUpgradeCost.toFixed(2);
  farmUpgradeCostSpan.textContent = farmUpgradeCost.toFixed(2);

  // Helper to manage visibility and state
  const manageUpgradeBtn = (btn, cost, baseCost) => {
    // Reveal if we can afford it, OR if we have already bought it (cost increased)
    // OR if it is already visible (don't hide it again)
    if (money >= cost || cost > baseCost || btn.style.display === 'flex') {
        btn.style.display = 'flex';
    }

    // Toggle disabled class
    if (money < cost) {
        btn.classList.add('disabled');
        btn.disabled = true;
    } else {
        btn.classList.remove('disabled');
        btn.disabled = false;
    }
  };

  manageUpgradeBtn(cpsUpgradeBtn, clickerupgradeCost, 0.1);
  manageUpgradeBtn(fastClickerUpgradeBtn, fastClickerUpgradeCost, 1);
  manageUpgradeBtn(printerUpgradeBtn, printerUpgradeCost, 15);
  manageUpgradeBtn(grannyUpgradeBtn, grannyUpgradeCost, 100);
  manageUpgradeBtn(farmUpgradeBtn, farmUpgradeCost, 300);
}