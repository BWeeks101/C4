# C4

C4 is a javascript version of the classic 'Connect 4' board game, from Hasbro.

Unlike the traditional game, C4's twist limits each players turn to 5s by default (this can be adjusted up to 30s if the player is finding things too challenging).

## UX
 
C4 has a light, minimalist design - it is a single responsive page with no images beyond social media icons.  The site is functional on desktops, laptops and mobile devices, with a minimum supported resolution of 280px x 568px.

C4, (based on the classic 'Connect 4' game from Hasbro), is quick and easy to play, yet difficult to master.  Using the default setting of 5s per player turn, a single game will be completed in under 4 minutes.  This makes it ideal for play with a friend during short work/education breaks, or whilst waiting for the kettle to boil!

### User Stories

1. As a User, I want to be able to play C4 with a real opponent in 'couch co-op' so that I can involve my immediate family and friends
2. As a User, I want to be able to play C4 with a real opponent online so that I can play when a local opponenent is not available
3. As a User, I want to be able to play C4 against an AI opponent so that I can practice on my own
4. As a User, I want to be able to review my results vs those of other players so that I can monitor my performance
5. As a User, I want to be able to customise my profile and playing pieces so that my experience is more unique
6. As a User, I want to be able to alter the difficulty of the AI in single player games to provide a challenge regardless of my skill level
7. As a User, I want to be able to adjust the challenge of the game by altering time limits for each turn to further refine challenge and the game experience
8. As a User, I want to be able to use the site effectively on mobile devices, tablets, laptops, and desktops so that I am not limited to playing in a single location or with a single device
9. As a User, I want to be able to review the rules to the game so that I can learn how to play

### Wireframes

Wireframes created in Balsamiq, and exported to /wireframes/c4-wireframes.pdf

### Differences between the Wireframes and Final Design

Whilst the site follows the same basic structure as the design wireframes, significant compromises had to be made due to time restrictions.  The site currently features a main page, where the user can see an animated logo, review the rules, customise player names and token colours, or start a local 'hotseat' multiplayer game.  The side navigation menu also features the option to switch between light and dark modes (with dark being the default).

It was not possible to implement online multiplayer, leaderboards/stat tracking, player accounts, or the uploading of profile images without a more comprehensive backend and database structure that are not currently available.  A single player AI was desired, but unfortunately was not achievable within the givin timeframe.

## Desired Features based on User Stories
1. Fully responsive mobile first design allows for a functional site on mobile, tablet, laptop and desktop, with a minimum resolution of 280px x 568px.
2. Minimalist design allows users to quickly setup a game and get straight to the fun!
3. User stat tracking allows users to monitor their progress, and find opponents of a similar skill level.
4. Functional single player UI with multiple difficulty levels allows for a solo experience
5. User selected turn time limits allow players to decrease/increase the pressure in line with their own skill level/preferences.
6. User preferences allow uploading of profile pictures
7. User preferences allow selection of colours used for both players tokens.
8. Hotseat multiplayer allows for local play on a single device
9. Online multiplayer allows for online games
10. Leaderboards!
11. Rules available to read online for players unfamiliar with the game.

### Existing Features
1. Fully responsive mobile first design allows for a functional site on mobile, tablet, laptop and desktop, with a minimum width of 360px.
	- The site was designed mobile-first, and dynamically scales up to higher resolutions.  The game renders and plays perfectly on mobile devices, which is the ideal way to play 
2. Minimalist design allows users to quickly setup a game and get straight to the fun!
	- Using the default settings, a player can get into a game with just 2 clicks.
3. User selected turn time limits allow players to decrease/increase the pressure in line with their own skill level/preferences.
	- Time limits can be set in increments of 5 seconds, starting with the default of 5 to a maximum of 30.
4. User preferences allow selection of colours used for both players tokens.
	- Users settings are available to customise both player names, and their chosen token colours.
5. User settings (player names, token colours), the turn time limit and the selected color mode are saved to local storage and restored automatically on load.
	- Users do not have to continually update their settings when refreshing the page.  The only restrictions are that both players must have unique names and token colours.  Player names have an 8 character max length.
6. Hotseat multiplayer allows for local play on a single device
	- This feature is fully functional.  In just 2 clicks, players can be in game.
	- A game can be paused/resumed/Reset at any time.
	- If left to run without user interaction, each time a player fails to take an action during their turn the game will automatically insert a token for that player into a random column.
	- Once a win/draw has been determined, a rematch can be started (using the same turn time limit) directly from the game screen.
7. Rules available to read online for players unfamiliar with the game.
	- The rules are available to read from the side menu, or directly from the main page.

### Features Left to Implement
1. Rules display during game play
	- I would like to add a feature to display the rules in a pop-up whilst the game is paused.  Currently the rules are not accessible during game play.
2. Single Player AI
	- I would like to add a single player AI.  Unfortunately this moved out of scope due to time constraints.
3. Online Multiplayer, Leaderboards/Stat Tracking
	- I would like to add Online Multiplayer, with Leaderboards and player stat tracking.  This will require a more comprehensive backend with database functionality that was not available for this project.
4. User Accounts with personalised settings (such as uploading profile pictures)
	- I would like to add a User Account system.  This will assist with Leaderboards/Stat Tracking, and will also allow players to save their name/colours and a profile picture for use on multiple devices/browsers.  This would also require a backend database.

### Outstanding Issues
1. When viewing the site through browser dev tools, changing the device can lead to rendering inconsistencies.
	- My previous project made extensive use of media queries.  For this project I wanted to heavily focus on Javascript, so instead of media queries I have made extensive use of the onresize attribute.  Changing the device within dev tools does not seem to trigger onresize.  Any rendering inconsistencies can be resolved by refreshing the page, or manually resizing the device display to trigger the onresize function.
2. If the user quickly clicks backwards and forwards between the main page and the User Settings or Rules panes, and ends on the main page, the logo animation will be triggered multiple times.
    - The only effect of this bug is to repeatedly play the logo animation.  There is no impact to the structure or functionality of the page.  The caveat being that whilst the log is animating it will not resize, so if the window is resized during the animation loop then the logo will not resize until the animation(s) complete - at which point it will adjust itself dynamically.

## Technologies Used
* [HTML5](https://en.wikipedia.org/wiki/HTML5/)
* [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets/)
* [JavaScript](https://javascript.com)
* [Bootstrap](https://getbootstrap.com)
    - The project uses **Bootstrap** to simplify flex layout, and assist with DOM manipulation via useful pre-built classes.
* [Font Awesome](https://fontawesome.com/)
	- The project uses **Fontawesome** for social media link icons.

## Testing

All testing was conducted manually
Devices tested in browser dev tools include:
- Galaxy Fold
- iPhone 5/SE
- Pixel 2
- Galaxy S5
- Moto G4
- iPhone 6/7/8
- Surface Duo
- iPhone 6/7/8 Plus
- Galaxy S9/S9+/S10e
- iPhone X/XS
- Pixel 2 XL
- 720p Screens
- 1080p Screens
- 4k Screens
											
Devices physically tested include:
- Galaxy S8
- Galaxy S10/S10e
- Galaxy A21
- Galaxy Tab A 10.1 2019
- 1080p Screens
- 4k Screens

1. Logo Animation
	1. Load the page.
	2. Within 2 seconds, the logo will animated.
	3. All letters will drop into the circle below them, and the background colour will change.
	4. The background colours will alternate red then blue, starting with red and ending with blue.
	5. The text colour will be white when within a circle.


2. Rules
	1. Load the page and click on the Rules button.
	2. The rules pane will be displayed above a Back button.
	3. At smaller vertical resolutions, the rules text will vertically scroll.  The button will remain in place.
	4. Click the Nav button on the header to open the sideNav.
	5. Observe that the side Nav has the following options:
		* X button
		* Color Mode
		* Home
		* Start Game
		* User Settings
	6. Click the Back button to return to the default pane.
	7. Observe that the logo animates when returning to the default pane from the Rules pane.
	

3. User Settings
	1. Load the page and click the User Settings button.
	2. The user settings pane will be displayed above a Back button.
	3. Enter text into the username boxes for both players. They will accept a maximum of 8 characters.
	4. Select token colurs for both players.  The button element will change to show the selected colour.
	5. Click the Back button to return to the default pane, then click the User Settings button again.
	6. Observe that the previously entered user names and selected colours are still set.  These values are written to local storage.
	    a. Reload the page and open the User Settings again.
        b. Observe that the values are still set.
	7. Click the Default button for each player to reset their names and colours.
	8. SideNav
		a. Open the side Nav using the Nav button on the header
		b. Observe that the side Nav has the following options:
        * X button
		* Color Mode
		* Home
		* Start Game
		* Rules
	9. Close the side Nav using either the X button, or by clicking off of the side Nav element
	10. Validation Alert
		a. Set both players with the same user name, and either click the back button, or open the sideNav and choose Home/Start Game/Rules.
		b. Observe that an alert box is displayed, detailing that players must have unique names.
		c. Observe that no links or buttons will function whilst the alert is displayed.
		d. Close the alert using either the Ok button or the X button.
		e. Ignore the user names, and change the colours so that they also match.
		f. Click the Back button again and observe that the Alert text has changed to detail that token colours must also be unique.
		g. Close the alert.
		h. Ignore the token colours.  Change the usernames so that they are unique.  Click the back button again.
		i. Observe that the Alert text has changed again to detail that token colours must be unique (with no mention of user names).
		j. Close the Alert, and alter the colours to be unique (or click the button(s) to set Default values for one or both players).
		l. Click the back button, or choose an option from the sideNav to load a different pane.  Observe that the data validates and the pane changes as expected.
    11. Observe that the logo animates when returning to the default pane from the Rules pane.


4. SideNav:
	1. Load the page and click on the Nav button on the title bar to open the menu.
	2. Observe that the menu slides on from the left
	3. Observe that the menu does not fill the full width of the screen
	4. Click anywhere to the right of the open menu
		a. Observe that the background content is darkened, and that no links/buttons on background page are accessible whilst the sideNav is open
		b. Observe that clicking anywhere to the right of the open sideNav will cause it to close (sliding off to the left).
    5. Open the side Nav again.  
    6.  Observe that the side Nav has the following options:
        * X button
        * Color Mode
        * Start Game
        * User Settings
        * Rules
    7. Selecting the X button will close the Nav.
    8. Selecting the Color Mode link will switch the site between light and dark (default) mode.  This value is saved to local storage.
        * Refresh the page and observe that your previously selected colour mode is applied automatically.
    9. Selecting Start Game will open the Turn Time Limit pane, from which the user can start a game.
    10. Selecting User Settings opens the User Settings pane.
    11. Selecting Rules opens the Rules pane. 


5. Start a Game
    1. Load the page and click the Start Game button
    2. Observe that the Turn Time Limit pane is displayed.
    3. The drop down box will allow selection of any turn time limit from 5-30s, in increments of 5.
    4. Select a value other than the default, then click the Back button to return to the default pane.
    5. Click the Start Game button again, and observe that your selection was maintained.
    6. Refresh the page, and click the Start Game button once again.  Observe that your selection still persists.
    7. Click Ok to Start a Game.
        a. The Game Board will be displayed.  Above the game board is the player info bar.  This contains the name of Player 1 on the left in their respective color, and the name of Player 2 is 'greyed out' on the right.  Below the game board is the feedback container.  This will display a 5 second counter before the game begins.
        b. Side Nav
            1. Opening the Side Nav during the 5 second starting count down will show the following:
                * X button
                * Color Mode
                * Quit
            2. The close button will close the side Nav.
            3. The Color Mode link will toggle between light and dark modes.
            4. The Quit link will close the game board and display the default pane.
            5. Once the game begins, the side Nav content will alter to also show
                * Pause/Resume
                * Reset
            6. Clicking Pause will pause the turn timer and prevent the user from clicking on the board.
                a. Whilse paused, the turn timer in the player info bar will not decrease
                b. The Pause link will be replaced with a Resume link
                    * Clicking the resume link will restart the turn timer and activate the onclick function of the game board.
                    * The resume link will then be replaced with the Pause Link
            7. The reset link will clear the game board and restart from the 5 second count down.
            8. Once the game begins, a countdown timer will appear between the player names in the player info bar.  The initial value (in seconds) will match that chosen on the Turn Time Limit pane.  The timer will decrease until a column is selected on the game board.
            9. When a column is selected, if that column is not full, the lowest empty space will change to match the colour of the active player.  If the column is full, the timer will continue until another column is selected.
            10. Play will then pass to the next player. Within the player info bar, the current players name will 'grey out' and lose it's underline.  The next players name will underline and change to their selected token colour.  The turn time counter will reset.
            11. If a player does not select a column during their turn, when the timer expires a column with at least one empty space will be randomly selected and a token inserted.
            12. Play continues until one player is determined to have placed their 4th token in a line (horizontally, vertically or diagonally).  The game determines this each time a token is placed by:
                a. Searching right, one column at a time, from the current position until either the edge of the board or a token belonging to another player is detected.
                b. Then searching left, one column at a time from the current position until either the edge of the board or a token belonging to another player is detected.
                C. If the total number of consecutive player tokens is not 4, then we reset the count to 0 and search down from the current position until either the bottom row or a token belonging to another player is detected.
                d. If we still do not have win condition, then we search right and down diagonally, then left and up diagonally
                e. If we still do not have a win condition, then we search left and down diagonally, then right and up diagonally
                f. The only exception is if the number of completed turns is less than 7.  It is not possible to complete a game in less than 7 turns, so until the 7th turn no scan takes place.
                g. If a win is not detected by the 42nd turn, then the board is full and we have a draw
            13. If a win is detected
                a. The winning tokens will pulse between their selected colour and white to visually identify the win on the board.
                b. 'Winner!' is displayed between the player names in the player info bar in place of the timer.  This will be in the chosen colour of the winner.
                c. A similarly styled (but larger) message will be displayed in the feedback container, along with a Rematch button, and a Quit button.
                d. The Pause/Resume/Reset links are removed from the side Nav and replaced with a Rematch link
                e. Clicking the Quit button or side Nav link will clear the board and return the user to the default pane.
                f. Clicking the Rematch button or side Nav link will clear the board state and start a new round, with the winner of the previous round taking the first turn.
            14. If a draw is detected
                a. 'Draw!' is displayed between the player names in the player info bar in place of the timer in the default font colour.
                b. A similarly styled (but larger) message will be displayed in the feedback container, along with a Rematch button, and a Quit button.
                c. The Pause/Resume/Reset links are removed from the side Nav and replaced with a Rematch link
                d. Clicking the Quit button or side Nav link will clear the board and return the user to the default pane.
                e. Clicking the Rematch button or side Nav link will clear the board state and start a new round, with the last player of the previous round taking the first turn.
            15. Observe that the logo animates when returning to the default pane from the Rules pane.


## Deployment
This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits
Connect 4 board game from [Hasbro](https://products.hasbro.com/en-gb/product/connect-4-game:80FB5BCA-5056-9047-F5F4-5EB5DF88DAF4)

Flex based 'Sticky Footer from [CSS-Tricks](https://css-tricks.com/couple-takes-sticky-footer/) and [Philip Walton](https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/)

SideNav from [W3 Schools Example](https://www.w3schools.com/howto/howto_js_sidenav.asp)

Customised Select Control from [W3 Schools Example](https://www.w3schools.com/howto/howto_custom_select.asp)

Animation Function Structure from [W3 Schools Example](https://www.w3schools.com/howto/howto_js_animate.asp)

Change colour of svg on hover (mask method) from [CSS-Tricks.com](https://css-tricks.com/change-color-of-svg-on-hover/#use-a-mask-instead-of-a-background-image)

### Content
- All text content written by myself.

### Acknowledgements
- I received inspiration for this project from my mentor Adegbenga Adeye (@gbenga_mentor), and the Hasbro board game 'Connect 4'.

### Research:

* CI Course Material and example projects
* W3C Schools [CSS](https://www.w3schools.com/css/default.asp/), [HTML](https://www.w3schools.com/html/default.asp/) and [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) Documentation
* [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) Documentation
* MDN web docs ([JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/))
* [Adobe Colour Wheel](https://color.adobe.com/create/color-wheel/)
* [ColorHexa.com](https://www.colorhexa.com/)
* [Coolors.co](https://coolors.co/)
* [CSS-Tricks.com](https://css-tricks.com/)
* [Stack Overflow](https://stackoverflow.com/)*
			
	*It is almost impossible to search for any coding related issue online without encountering Stack Overflow links towards the top of the results.  Whilst I certainly read Stack Overflow when researching solutions to challenges, I have not (to the best of my recollection or per my notes) utilised any code directly, in whole or in part.

