# Changelog

All notable changes to this project will be documented in this file.

## [v0.1.0] - 25/01/2026

<!-- 
MAJOR version when you make incompatible API changes
MINOR version when you add functionality in a backward compatible manner
PATCH version when you make backward compatible bug fixes 
-->

### Added
- **New Upgrades:**
  - "Fast Auto Clicker" upgrade (Increases CPS by 2, Click Power by 0.02).
  - Basic "Auto Clicker" upgrade (Increases CPS by 1, Click Power by 0.01).

- **Save System:**
  - Manual "Save" button to persist game state to local storage.
  - "Load Save" button to retrieve previous progress.
  - Automatic saving every 2 minutes.

- **Visual Effects:**
  - Pop animation effect when clicking the money bag.
  
- **Sound Affects:**
  - Added sound when print money is clicked. 

- **UI Improvements:**
  - Dynamic display of current bank balance.
  - Upgrade buttons appear only when affordable.
  - "Bank Balance" card with descriptive text.


## 
## [v0.2.0] - 27/01/2026

### Added
- **New Upgrades:**
  - "Printer Upgrade" Upgrade (Increases CPS by +10 and Click Power by 0.1).

- **Visual Effects:**
  - Added visual images for printer upgrade.
  - Added visual affects for print money click. 


## 
## [v0.3.0] - 29/01/2026
- **New Upgrades:**
  - "Grannys wet mattress" Upgrade (Increases CPS by +50 and Click Power by 0.5).

- **Visual Effects:**
  - Added Visual for Grannys Wet Mattress.
  - Added motion for button clicks on upgrades.
  
- **UI Improvements:**
   - Added UI increase counter for 'Print Money'.
   - Added Grey Out affect for when upgrade is not affordable. 
  
- **Optimisations:**
    - Optimisation for images.
    - Optimisation for CSS, JS, Google Fonts.


## 
## [v0.4.1] - 31/01/2026
- **New Upgrades:**
  - Removed clickpower multiplers for all above 'Fast Auto Clicker' Upgrade.
 
- **Visual Effects:**
  - Replaced the standard click button with an interactive money icon.
  - Upgraded the upgrade buttons with better layout and visuals.
  - Added quantity bought for upgrade
  - Added favicon image

- **UI Improvements:**
  - Made the button upgrade click movements more exaggerated. 
  - Resized the total size of dollar.png.
  - Fixed a bug where 'Fast Auto Clicker Upgrade' was displaying incorrect CPS and click power.
  - Fixed incorrect title for game.

- **Optimisations:**
  - Optimised styles for better page loading.


## 
## [v0.5.2] - 06/02/2026
- **Fixes:**
   - Fixed an issue where Buy Me a Coffee did not link correctly.

- **UI Improvements:**
  - Made the UI more stable when currency is increased.

- **New Upgrades:**
   - Added first set of Acheivements.
   - Added new upgrades 'Farm', 'Investment Bank'.
   - Added sporadic random piggy bank.

- **Optimisations:**
  - Re-worked logic behind money gathering (based on time).

- **Visual Effects:**
  - Added next upgrade preview.
  - Added sporadic random piggy bank event.


## 
## [v0.5.3] - 07/02/2026
- **Fixes:**
  - Added \<br> tag to about section to break up content better.
  - Replaced footer position.
  - Fixed a bug where farm upgrade was not showing as next upgrade to be unlocked.
  - Fixed a bug where quantity count was not being added to save data.
  - Fixed a bug where 'load save' did not include upgrade quantity. 

- **UI Improvements:**
  - Added starter achievements.


##
## [v0.5.4] - 08/02/2026
- **Optimisations:**
  -  Replaced the fixed-interval game loop with a new `dynamicLoop` function. This adjusts the UI update rate based on the player's CPS, improving performance, especially at higher income levels.
  
- **Fixes:**
  - The game no longer freezes upon reaching $1.00.
  - Drastically improved performance by preventing the achievements list from being rebuilt multiple times per second.
  - Fixed multiple bugs in the income calculation to ensure money per second accurately reflects the player's CPS and Click Power.
  - Resolved an issue where manual clicks would interfere with and reset passive income generation.
  - Achievements are now correctly displayed on game load.

- **UI Improvements:**
  - Improved the styling for locked and upcoming upgrades. The blur effect has been removed in favor of a clear opacity change, making the text readable while still indicating a locked state.