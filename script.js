// Versioning:: MAJOR.MINOR.PATCH


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
let totalClicks = 0; // Total number of clicks made by the player

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
let printerUpgradeCost = 35;
let grannyUpgradeCost = 200;
let farmUpgradeCost = 500;

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
const dpsDisplay = document.getElementById('dps-display');
const grannyUpgradeBtn = document.getElementById('granny-upgrade');
const grannyUpgradeCostSpan = document.getElementById('granny-upgrade-cost');
const farmUpgradeBtn = document.getElementById('farm-upgrade');
const farmUpgradeCostSpan = document.getElementById('farm-upgrade-cost');



const loadSaveBtn = document.getElementById('load-save-btn');
const alertBox = document.getElementById('alert');
const autosaveAlertBox = document.getElementById('autosave-alert');
const clickSound = new Audio('sounds/$$.mp3');
const printerUpgradeBtn = document.getElementById('printer-upgrade');
const coinDiv = document.getElementById('coin-container');

// Load Save Button Logic
loadSaveBtn.addEventListener('click', loadGame);

// Achievements
const achievements = {
  'first_click': {
    name: 'First Click',
    description: 'Make your first click.',
    unlocked: false,
    condition: () => money >= 0.01
  },
  'first_dollar': {
    name: 'First Dollar',
    description: 'Earn your first dollar.',
    unlocked: false,
    condition: () => money >= 1
  },
  'millionaire': {
    name: 'Millionaire Row',
    description: 'Reach $1,000,000.',
    unlocked: false,
    condition: () => money >= 1000000
  },
  'CEO': {
    name: 'S&P 500 CEO',
    description: 'Reached average CEO wealth.',
    unlocked: false,
    condition: () => cps_display >= 0.6
  },
  'footballer_cr7': {
    name: 'Cristiano Ronaldo',
    description: 'Reached CR7 wealth.',
    unlocked: false,
    condition: () => cps_display >= 7.75
  },
  'taylor_swift': {
    name: 'Taylor Swift',
    description: 'Reached Taylor Swift wealth.',
    unlocked: false,
    condition: () => cps_display >= 15.9
  },
  'Jensen_huang': {
    name: 'Jensen Huang',
    description: 'Reached Jensen Huang wealth.',
    unlocked: false,
    condition: () => cps_display >= 485.2
  },
  'Daddy_Bezoz': {
    name: 'Daddy Bezos',
    description: 'Reached Jeff Bezos wealth.',
    unlocked: false,
    condition: () => cps_display >= 920
  },
  'Musk': {
    name: 'Elon Musk',
    description: 'Reached Elon Musk wealth.',
    unlocked: false,
    condition: () => cps_display >= 2750
  }
}

// function to initialize achievements
function initializeAchievements() {
  const grid = document.getElementById('achievements-grid');
  // clear the grid
  grid.innerHTML = '';

  // create achievement elements
  for (const key in achievements) {
    const achievement = achievements[key];
    const el = document.createElement('div');
    el.id = 'achievement-' + key;
    el.classList.add('achievement');
    if (achievement.unlocked) {
      el.classList.add('unlocked');
    }

    el.innerHTML = `
      <div class="achievement-title">${achievement.name}</div>
      <div class="achievement-description">${achievement.description}</div>
    `;
    grid.appendChild(el);
  }
}

// Function to unlock the achievement
function unlockAchievement(key) {
  if (achievements[key] && !achievements[key].unlocked) {
    achievements[key].unlocked = true;

    const achievementEl = document.getElementById('achievement-' + key);
    if (achievementEl) {
        achievementEl.classList.add('unlocked');
    }
    
    // Show achievement unlocked message
    alertBox.textContent = `Achievement Unlocked: ${achievements[key].name}`;
    alertBox.classList.remove('hidden');
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 3000);
  }
}

// Function to check all achievement conditions
function checkAchievements() {
  if (totalClicks >= 1) {
    unlockAchievement('first_click');
  }
  if (money >= 1) {
    unlockAchievement('first_dollar');
  }
  if (money >= 1000000) {
    unlockAchievement('millionaire');
  }
  if (cps_display >= .04) {
    unlockAchievement('Engineer');
  }
  if (cps_display >= 0.6) {
    unlockAchievement('CEO');
  }
  if (cps_display >= 7.75) {
    unlockAchievement('footballer_cr7');
  }
  if (cps_display >= 15.9) {
    unlockAchievement('taylor_swift');
  }
  if (cps_display >= 485.2) {
    unlockAchievement('Jensen_huang');
  }
  if (cps_display >= 920) {
    unlockAchievement('Daddy_Bezoz');
  }
  if (cps_display >= 2750) {
    unlockAchievement('Musk');
  }
}

// upgrades
const upgrades = [
  {
    element: cpsUpgradeBtn,
    revealCondition: () => money >= 0.1,
    revealed: false
  },
  {
    element: fastClickerUpgradeBtn,
    revealCondition: () => money >= 1,
    revealed: false
  },
  {
    element: printerUpgradeBtn,
    revealCondition: () => money >= 35,
    revealed: false 
  },
  {
    element: grannyUpgradeBtn,
    revealCondition: () => money >= 200,
    revealed: false
  },
  {
    element: farmUpgradeBtn,
    revealCondition: () => money >= 500,
    revealed: false
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
    totalClicks = gameSaveData.totalClicks || 0; // Load total clicks, default to 0 if not present


    buyCount = gameSaveData.buyCount || 0;
    fastClickerCount = gameSaveData.fastClickerCount || 0;
    printerCount = gameSaveData.printerCount || 0;
    grannyCount = gameSaveData.grannyCount || 0;
    farmCount = gameSaveData.farmCount || 0;


    updateUI();
    log.log('Game Loaded: $' + money.toFixed(2));
    displayLoadSaveMessage();
  } else {
    log.log('No save data found.');
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
    totalClicks: totalClicks,
    clickerupgradeCost: clickerupgradeCost,
    fastClickerUpgradeCost: fastClickerUpgradeCost,
    printerUpgradeCost: printerUpgradeCost,
    grannyUpgradeCost: grannyUpgradeCost,
    farmUpgradeCost: farmUpgradeCost,
    buyCount: buyCount,
    fastClickerCount: fastClickerCount,
    printerCount: printerCount,
    grannyCount: grannyCount,
    farmCount: farmCount
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
    // todo: add quantity of upgrades purchased to save data

    printerUpgradeCost = gameSaveData.printerUpgradeCost || 35;
    grannyUpgradeCost = gameSaveData.grannyUpgradeCost || 200;
    farmUpgradeCost = gameSaveData.farmUpgradeCost || 500;
    buyCount = gameSaveData.buyCount || 0;
    fastClickerCount = gameSaveData.fastClickerCount || 0;
    printerCount = gameSaveData.printerCount || 0;
    grannyCount = gameSaveData.grannyCount || 0;
    farmCount = gameSaveData.farmCount || 0;

    // Update quantity displays after loading
    upgradeQuantitySpan.textContent = "x" + buyCount;
    fastQuantitySpan.textContent = "x" + fastClickerCount;
    printerQuantitySpan.textContent = "x" + printerCount;
    grannyQuantitySpan.textContent = "x" + grannyCount;
    farmQuantitySpan.textContent = "x" + farmCount;

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
    fastClickerUpgradeCost: fastClickerUpgradeCost,
    printerUpgradeCost: printerUpgradeCost,
    grannyUpgradeCost: grannyUpgradeCost,
    farmUpgradeCost: farmUpgradeCost,
    buyCount: buyCount,
    fastClickerCount: fastClickerCount,
    printerCount: printerCount,
    grannyCount: grannyCount,
    farmCount: farmCount
  };
  localStorage.setItem('moneyClickerSave', JSON.stringify(gameSaveData));
  sessionStorage.setItem('moneyClickerSave', JSON.stringify(gameSaveData));
  log.log('Game Saved: $' + money.toFixed(2)); 
}

// Click Button - Play Sound
clickBtn.addEventListener('click', (e) => {
  money += clickPower;
  totalClicks += 1; // Increment total clicks
  moneyDisplay.innerText = money.toLocaleString();
  
  const moneyBag = document.querySelector('#dollar');
  // Remove animation so it can restart
  moneyBag.classList.remove('pop');

  // Force browser to reset animation
  void moneyBag.offsetWidth;

  // Re-add animation
  moneyBag.classList.add('pop');
  playClickSound(); // Play sound on click
  rain();
  checkAchievements();
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

// CPS Upgrade Logic
cpsUpgradeBtn.addEventListener('click', () => {
    if (money >= clickerupgradeCost) {
      money -= clickerupgradeCost;
      cps += 1; // Increase CPS by 1
      buyCount += 1; // Increment purchase count
      clickPower += 0.01; // Increase click power
      moneyDisplay.innerText = money.toLocaleString();
      clickerupgradeCost *= 5; // Increase cost
      
      // Update displays
      cpsDisplay.textContent = cps_display += 1;
      dpsDisplay.textContent = `$${(cps_display * clickPower).toFixed(2)}`;
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
      fastClickerUpgradeCost *= 3; // Increase cost
      
      // Update displays
      cpsDisplay.textContent = cps_display += 3;
      dpsDisplay.textContent = `$${(cps_display * clickPower).toFixed(2)}`;
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
      printerUpgradeCost *= 2; // Increase cost

      // Update displays
      cpsDisplay.textContent = cps_display += 10;
      dpsDisplay.textContent = `$${(cps_display * clickPower).toFixed(2)}`;
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
      grannyUpgradeCost *= 2; // Increase cost

      // Update displays
      cpsDisplay.textContent = cps_display += 50;
      dpsDisplay.textContent = `$${(cps_display * clickPower).toFixed(2)}`;
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
      farmUpgradeCost *= 2; // Increase cost

      // Update displays
      cpsDisplay.textContent = cps_display += 100;
      dpsDisplay.textContent = `$${(cps_display * clickPower).toFixed(2)}`;
      farmQuantitySpan.textContent = "x" + farmCount; // Update quantity display
      updateUI();
      }
    }
  );

// Re-work for money increase using time
function gameRun() {
  money += (Date.now())
}

function dynamicLoop() {
  updateUI();
  let currentCps = (typeof cps_display !== 'undefined' && cps_display > 0) ? cps_display : 1;
  let delay = 1000 / currentCps;
  if(delay < 16) delay = 16;
  setTimeout(dynamicLoop, delay);
}
dynamicLoop();

setInterval(function() {
  console.log('Auto-saving game...');
  autoSave();
}, 120000); // 120,000 milliseconds = 2 minutes


// Functions
function updateUI() {
  checkAndRevealUpgrades();
  checkAchievements();
  const now = Date.now();
  const deltaTime = (now - last_known_click_time) / 1000; // in seconds
  last_known_click_time = now;

  // increease based on time passed
  const moneyEarned = (cps * clickPower) * deltaTime;
  money += moneyEarned;

  // Getting the current cps
  cpsDisplay.textContent = cps_display;
  moneyDisplay.textContent = money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Show current auto-clicker cost
  cpsUpgradeCostSpan.textContent = clickerupgradeCost.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  fastClickerUpgradeCostSpan.textContent = fastClickerUpgradeCost.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  printerUpgradeCostSpan.textContent = printerUpgradeCost.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  grannyUpgradeCostSpan.textContent = grannyUpgradeCost.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  farmUpgradeCostSpan.textContent = farmUpgradeCost.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  dpsDisplay.textContent = `$${(cps_display * clickPower).toFixed(2)}`;

  // Helper to manage visibility and state
  const manageUpgradeBtn = (btn, cost, baseCost) => {
    // Visibility is now handled entirely by checkAndRevealUpgrades()
    // We only handle enabled/disabled state here

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
  manageUpgradeBtn(printerUpgradeBtn, printerUpgradeCost, 35);
  manageUpgradeBtn(grannyUpgradeBtn, grannyUpgradeCost, 200);
  manageUpgradeBtn(farmUpgradeBtn, farmUpgradeCost, 500);
}

// Initial setup on page load
initializeAchievements();
updateUI();