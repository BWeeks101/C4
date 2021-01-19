# C4

### Interactive Front-End Development Milestone Project

C4 is a JavaScript version of the classic 'Connect 4' board game, from Hasbro.

Unlike the traditional game, C4's twist limits each players turn to 5s by default (this can be adjusted up to 30s if the player is finding things too challenging).

#### View the live site [here](https://bweeks101.github.io/C4/).

## UX

<img src="/wireframes/c4mobile.png">
<img src="/wireframes/c4tablet.png">

C4 has a light, minimalist design - it is a single responsive page with no images beyond social media icons. The site is functional on desktops, laptops and mobile devices, with a minimum supported horizontal resolution of 280px, and minimum supported vertical resolution of 568px.

*NB: The site will function on lower horizontal/vertical resolutions, but the page will scroll as required.  This may interfere with gameplay.*

C4, (based on the classic 'Connect 4' game from Hasbro), is quick and easy to play, yet difficult to master. Using the default setting of 5s per player turn, a single game will be completed in under 4 minutes. This makes it ideal for play with a friend during short work/education breaks, or whilst waiting for the kettle to boil!

### User Stories

#### New User Goals

1. Be able to play C4 with a real opponent in 'couch co-op' so that I can involve my immediate family and friends.

2. Be able to play C4 with a real opponent online so that I can play when a local opponent is not available.

3. Be able to play C4 against an AI opponent so that I can practice on my own.

4. Be able to customise my profile and playing pieces so that my experience is more unique.

5. Be able to alter the difficulty of the AI in single player games to provide a challenge regardless of my skill level.

6. Be able to adjust the challenge of the game by altering time limits for each turn to further refine challenge and the game experience.

7. As a User, I want to be able to use the site effectively on mobile devices, tablets, laptops, and desktops so that I am not limited to playing in a single location or with a single device.

8. As a User, I want to be able to review the rules of the game so that I can learn how to play.

#### Returning User Goals

1. Be able to review my results vs those of other players so that I can monitor my performance.

2. Be able to store my profile customisations so that they are retained for future sessions.

### Wireframes

Wireframes created in Balsamiq, and exported to /wireframes/c4-wireframes.pdf

### Differences between the Wireframes and Final Design

Whilst the site follows the same basic structure as the design wireframes, significant compromises had to be made due to time restrictions and technology availability. The site currently features a main page, where the user can see an animated logo, review the rules, customise player names and token colours, or start a local 'hotseat' multiplayer game. The side navigation menu also features the option to switch between light and dark modes (with dark being the default).  The player can also specify the turn time length for games.  These preferences are all written to local storage.

It was not possible to implement online multiplayer, leaderboards/stat tracking, player accounts, or the uploading of profile images without a more comprehensive backend and database structure that are currently unavailable. A single player AI was desired, but unfortunately was not achievable within the given timeframe.

## Desired Features based on User Stories

1. Fully responsive mobile first design allows for a functional site on mobile, tablet, laptop and desktop, with a minimum. resolution of 280px x 568px.
2. Minimalist design allows users to quickly setup a game and get straight to the fun!
3. User stat tracking allows users to monitor their progress, and find opponents of a similar skill level.
4. Functional single player UI with multiple difficulty levels allows for a solo experience.
5. User selected turn time limits allow players to decrease/increase the pressure in line with their own skill level/preferences.
6. User preferences allow uploading of profile pictures.
7. User preferences allow selection of colours used for both players tokens.
8. Hotseat multiplayer allows for local play on a single device.
9. Online multiplayer allows for online games.
10. Leaderboards!
11. Rules available to read online for players unfamiliar with the game.

### Existing Features

1. Fully responsive mobile first design allows for a functional site on mobile, tablet, laptop and desktop, with a minimum width of 280px, and minimum height of 568px.
	- The site was designed mobile-first, and dynamically scales up to higher resolutions. The game renders and plays perfectly on modern mobile devices, which is the ideal way to play.

2. Minimalist design allows users to quickly setup a game and get straight to the fun!
	- Using the default settings, a player can get into a game with just 2 clicks.

3. User selected turn time limits allow players to decrease/increase the pressure in line with their own skill level/preferences.
	- Time limits can be set in increments of 5 seconds, starting with the default of 5 to a maximum of 30.

4. User preferences allow selection of colours used for both players tokens.
	- Users settings are available to customise both player names, and their chosen token colours.

5. User settings (player names, token colours), the turn time limit and the selected colour mode are saved to local storage and restored automatically on load.
	- Users do not have to continually update their settings when refreshing the page. The only restrictions are that both players must have unique names and token colours. Player names have an 8 character max length.

6. Hotseat multiplayer allows for local play on a single device
	- This feature is fully functional. In just 2 clicks, players can be in game.
	- A game can be paused/resumed/reset at any time.
	- If left to run without user interaction, each time a player fails to take an action during their turn, the game will automatically insert a token for that player into a random column.
	- Once a win/draw has been determined, a rematch can be started (using the same turn time limit) directly from the game screen.

7. Rules available to read online for players unfamiliar with the game.
	- The rules are available to read from the side menu, or directly from the main page.

### Features Left to Implement

1. Rules display during game play
	- I would like to add a feature to display the rules in a pop-up whilst the game is paused. Currently the rules are not accessible during game play.

2. Single Player AI
	- I would like to add a single player AI. Unfortunately this moved out of scope due to time constraints.

3. Online Multiplayer, Leaderboards/Stat Tracking
	- I would like to add Online Multiplayer, with Leaderboards and player stat tracking. This will require a more comprehensive backend with database functionality that was not available for this project.

4. User Accounts with personalised settings (such as uploading profile pictures)
	- I would like to add a User Account system. This will assist with Leaderboards/Stat Tracking, and will also allow players to save their name/colours and a profile picture for use on multiple devices/browsers. This would also require a backend database.

### Outstanding Issues

1. When viewing the site through browser dev tools, changing the device can lead to rendering inconsistencies.
	- My previous project made extensive use of media queries. For this project I wanted to heavily focus on JavaScript, so instead of media queries I have made extensive use of the onresize attribute. Changing the device within dev tools does not seem to trigger onresize. Any rendering inconsistencies can be resolved by refreshing the page, or manually resizing the device display to trigger the onresize function.

2. If the user quickly clicks backwards and forwards between the main page and the User Settings or Rules panes, and ends on the main page, the logo animation will be triggered multiple times.
	- The only effect of this bug is to repeatedly play the logo animation. There is no impact to the structure or functionality of the page. The caveat being that whilst the log is animating it will not resize, so if the window is resized during the animation loop then the logo will not resize until the animation(s) complete - at which point it will adjust itself dynamically.

## Technologies Used

* [HTML5](https://en.wikipedia.org/wiki/HTML5/)
* [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets/)
* [JavaScript](https://javascript.com)
* [Bootstrap](https://getbootstrap.com)
	- The project uses **Bootstrap** to simplify flex layout, and assist with DOM manipulation via useful pre-built classes.
* [Font Awesome](https://fontawesome.com/)
	- The project uses **Font Awesome** for social media icons.
* [Git](https://git-scm.com/)
* [GitHub](https://github.com)
* [Gitpod](https://gitpod.io)
* [StackEdit](https://stackedit.io/)

## Testing

All testing was conducted manually, making extensive use of Dev Tools within Mozilla Firefox, Google Chrome and Microsoft Edge browsers.

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
	- Load the page.
	- After 2 seconds, the logo will animate:
		- All letters will drop into the circle below them in a staggered pattern.
		- The background colours will alternate over the circles in red then blue.
		- The text colour will be white when within a circle regardless of colour mode.

2. Rules
	- Load the page and click on the Rules button.
	- The rules pane will be displayed above a Back button.
	- At smaller vertical resolutions, the rules text will vertically scroll. The button will remain in place.
	- Click the Nav button on the header to open the sideNav.
	- Observe that the side Nav has the following options:
		* X button
		* Colour Mode
		* Home
		* Start Game
		* User Settings
	- Close the side Nav using either the X button, or by clicking off of the side Nav element
	- Click the Back button to return to the default pane.
	- Observe that the logo animates when returning to the default pane from the Rules pane.

3. User Settings
	- Load the page and click the User Settings button.
	- The user settings pane will be displayed above a Back button.
	- Enter text into the username boxes for both players. They will accept a maximum of 8 characters.
	- Select token colours for both players.
	- The button element will change to show the selected colour.
	- Click the Back button to return to the default pane
	- Observe that the logo animates when returning to the default pane from the Rules pane.
	- Click the User Settings button again.
	- Observe that the previously entered user names and selected colours are still set. These values are written to local storage.
	- Reload the page and open the User Settings again.
	- Observe that the values are still set.
	- Click the Default button for each player to reset their names and colours.
	- Open the side Nav using the Nav button on the header
	- Observe that the side Nav has the following options:
		* X button
		* Colour Mode
		* Home
		* Start Game
		* Rules
	- Close the side Nav using either the X button, or by clicking off of the side Nav element.
	- Validation Alert
		* Set both players with the same user name, and either click the back button, or open the sideNav and choose Home/Start Game/Rules.
		* Observe that an alert box is displayed, detailing that players must have unique names.
		* Observe that no links or buttons will function whilst the alert is displayed.
		* Close the alert using either the Ok button or the X button.
		* Ignore the user names, and change the colours so that they also match.
		* Click the Back button, or open the side Nav and choose Home/Start Game/Rules once again.
		* Observe that the Alert text has changed to detail that token colours must also be unique.
		* Close the alert.
		* Ignore the token colours. Change the usernames so that they are unique.
		* Click the Back button, or open the side Nav and choose Home/Start Game/Rules once again.
		* Observe that the Alert text has changed again to detail that token colours must be unique (with no mention of user names).
		* Close the Alert, and alter the colours to be unique (or click the Default button(s) to set default values for one or both players).
		* Click the Back button, or open the side Nav and choose Home/Start Game/Rules to load a different pane.
		* Observe that the data validates and the pane changes as expected.

4. SideNav:
	- Load the page and click the Nav button on the title bar to open the side Nav.
	- Observe that the menu slides on from the left
	- Observe that the menu does not fill the full width of the screen
	- Observe that visible page content is darkened, and that no links/buttons on background page are accessible whilst the sideNav is open
	- Click anywhere to the right of the open menu
	- Observe that clicking anywhere to the right of the open sideNav will cause it to close (sliding off to the left).
	- Open the side Nav again.
	- Observe that the side Nav has the following options:
		* X button
			- Closes the side Nav, causing it to slide off to the left.
		* Colour Mode
			- Toggles between light and dark (default) colour modes. This selection is saved to local storage.
			- Refresh the page and observe that your previously selected colour mode is applied automatically.
		* Start Game
			- Opens the Turn Time Limit pane, from which the user can start a game.
		* User Settings
			- Opens the User Settings pane.
		* Rules
			- Opens the Rules pane.

5. Start a Game
	- Load the page and click the Start Game button
	- Observe that the Turn Time Limit pane is displayed.
	- The drop down box will allow selection of any turn time limit from 5-30s, in increments of 5.
	- Select a value other than the default, then click the Back button to return to the default pane.
	- Observe that the logo does *not* animate when returning to the default pane from the Turn Time Limit pane.
	- Click the Start Game button again
	- Observe that your selection was maintained.
	- Refresh the page, and click the Start Game button once again.
	- Observe that your selection still persists. This value is written to local storage and loaded automatically.
	- Click Ok to Start a Game.
	- The Game Board will be displayed.
	- Above the game board is the player info bar. This contains:
		- The name of Player 1 on the left in their respective token color
		- The name of Player 2 is 'greyed out' on the right.
		- Below the game board is the feedback container. This will display a 5 second counter before the game begins.
		- Opening the Side Nav during the 5 second starting count down will show the following:
		* X button
			- Closes the side Nav, causing it to slide off to the left.
		* Colour Mode
			- Toggles between light and dark (default) colour modes.
		* Quit
			- Clears the game board and displays the default pane.
	- Once the game begins, the side Nav content will alter to also show
		* Pause/Resume
			- Pause the turn timer and prevent the user from clicking on the board.
				* While paused, the turn timer in the player info bar (displayed during play) will not decrease
				* While paused, the Pause option will be replaced with Resume			
			- Resume will restart the turn timer and activate the onclick function of the board
				* The Resume option will be replaced with Pause
		* Reset
			- Clears the game board and restarts the 5 second pre-game count down.
	- Once the game begins, a countdown timer will appear between the player names in the player info bar.
	- The initial value (in seconds) will match that chosen on the Turn Time Limit pane.
	- The timer will decrease until a column is selected on the game board.
	- When a column is selected:
		- If that column is not full:
			- The lowest empty space will change to match the colour of the active player.
		- If the column is full:
			- The timer will continue to decrease until another column is selected.
		- If a column is not selected before the turn timer expires:
			- A column with at least one empty space will be randomly selected for the active player.
	- When a column is successfully selected:
		- The turn is complete, and a background turn counter (c4.game.completedTurns) is incremented
		- If at least 7 turns have been completed the game logic will:
		- Get the active player
		- Get the coordinates of the current 'token' on the game board assigned to that player
		- Set a token count to 1
		- Scan to the *right* across the row until it encounters:
			- A 'token' owned by the other player
			- An empty cell
			- The edge of the game board
			- 3 more 'tokens' for the active player
		- Each time we find another 'token' for the active player, the token count is increased by 1
		- If the token count does **not** reach 4 during the *right* scan
			- Scan to the *left* across the row utilising the same logic
			- If the token count does **not** reach 4 during the *left* scan
				- Set the token count to 1
		- Scan *down* the column utilising the same logic
			- If the token count does **not** reach 4 during the *down* scan
				- Set the token count to 1
		- Scan diagonally *down/right* utilising the same logic
			- If the token count does **not** reach 4 during the diagonal *down/right* scan
				- Scan diagonally *up/left* utilising the same logic
					- If the token count does **not** reach 4 during the diagonal *up/left* scan
						- Set the token count to 1
		- Scan diagonally *down/left* utilising the same logic
			- If the token count does **not** reach 4 during the *down/left* scan
				- Scan diagonally *up/right* utilising the same logic
					- If the token count does **not** reach 4 then there are no winning patterns relating to this token
					- If the turn counter is less than 42 then play passes to the next player.
						- Within the player info bar:
							- The current players name will 'grey out' and lose it's underline.
							- The next players name will underline and change to their selected token colour.
							- The turn time counter will reset.
					- If the turn counter is 42 then the board is full, and we return a draw result
						- The turn time countdown text is replaced with 'Draw!' in the default text colour.
						- A larger draw message will be displayed in the feedback container in the default text colour.
						- Below the text will be:
							- Rematch button.
							- Quit button.
						- The Pause/Resume and Reset options are removed from the side Nav.
						- A Rematch option is added to the side Nav.
						- Selecting either Quit element (from the side Nav or feedback container) will clear the board and return the user to the default pane.
						- Observe that the logo animates when returning to the default pane from the game board.
						- Selecting either Rematch element (from the side Nav or feedback container) will reset the board and start a new game, with the last player of the previous game taking the first turn.	
	- If the token count **does** reach 4 at any of the above steps
		- We have found a winning pattern
		- Further scans are avoided
		- The winning 'tokens' will pulse between their selected token colour and white to visually identify the win on the game board.
		- The turn time countdown text is replaced with 'Winner!' in the token colour of the winning player.
		- A larger win message will be displayed in the feedback container in the token colour of the winning player.
		- Below the text will be:
			- Rematch button.
			- Quit button.
		- The Pause/Resume and Reset options are removed from the side Nav.
		- A Rematch option is added to the side Nav.
		- Selecting either Quit element (from the side Nav or feedback container) will clear the board and return the user to the default pane.
			- Observe that the logo animates when returning to the default pane from the game board.
		- Selecting either Rematch element (from the side Nav or feedback container) will reset the board and start a new game, with the winner of the previous game taking the first tur

### Notable Challenge - datagrid.js

The original UX design of the site necessitated multiple user selectable datagrids. The original concept involved pulling data from databases into objects, which would display as a fairly traditional datagrid, with fixed headers, content scroll and options to select entire columns or rows with a single click. eg:

- The leaderboard display had multiple column headings, and then users with their win/loss record
- Joining a multiplayer game would require selecting an open slot from a list of available games, displayed as a list
- The game board itself would be a datagrid without headers

However, neither HTML nor JavaScript have a default datagrid control. This meant that I would either have to:

- Build a custom layout for each grid by hand, and then very carefully programmatically populate and refresh the date,
- Look for a control that had already been created, learn how to use it, avoid any pitfalls (and potentially any bloat) that could be caused by another framework.
- Write my own

As my personal goal for this project was to learn, I decided to go with the latter option. It was a challenge, but had the advantages of getting me familiar with manipulating the DOM, and creating and utilising objects and object constructors. I approached this as if I was creating a tool that could be used for multiple projects, so the datagrid.js has standardised functions and objects, a default matching CSS (datagrid.css), and plenty of comments!

The datagrid object consists of a single array for the header row (the headerArray) of which each element must be a string, then another array for each column of data (contentArrays). Their must be one content array per element within the header array. Content arrays do not all need to contain the same number of objects - undefined entries will be pushed to the end of each array shorter than the longest to pad the length.  

The dataGridDisplay function will then render this data (with multiple options available) as a flex grid built (for now) using bootstrap classes.  

Please see the comments within datagrid.js and datagrid.css for more details (including limitations).  

In the future I would like to resolve the noted limitations (max of 12 columns within a screen, only vertical scroll with locked headers) and remove the reliance on bootstrap.  

### Notable Challenge - jQuery

As I had never worked with JavaScript before, I wanted to become as familiar with it as possible. Therefore I made the decision to avoid using jQuery for this project on the basis that I would like to understand how JavaScript works before I start using custom solutions and shortcuts.

### Notable Challenge - JavaScript animations and dynamic scaling

Although I wanted to keep the site as lean as possible with very few images and no media-queries, the design still required a logo and small navbar logo. I decided to make further use of my datagrid for both, and learn how to animate with JavaScript at the same time. This also provided an opportunity to learn how to dynamically scale text on resize as well as objects.  

The site is supported on devices with a minimum width of 280px (based on the Galaxy Fold in dev tools), and a minimum height of 568px (based on the iPhone5 in dev tools). Dynamic scaling is achieved by utilising JavaScript functions attached to the onresize attribute of the body element.

## Deployment

The project was deployed to GitHub Pages using the following method:

1. Open the [Code Institute Gitpod Template](https://github.com/Code-Institute-Org/gitpod-full-template/)
2. Click [Use this template](https://github.com/Code-Institute-Org/gitpod-full-template/generate/)
3. Provide a Name
4. Provide a Description
5. Choose Public
6. Click 'Create Repository from template'. GitHub will create the repository and open it.
7. Click 'Settings'
8. Scroll down to 'GitHub Pages'
9. Change Source from 'none' to 'master' and click 'Save'
 
The project was then developed using [Gitpod](https://gitpod.io/). There are no differences between the developed and deployed versions, and no additional code branches. Changes saved in Gitpod were committed and pushed to GitHub frequently throughout the development process.

Running the code locally would involve installing a webhost, downloading the latest [commit](https://github.com/BWeeks101/C4/archive/master.zip), then extracting that zip to an appropriate folder to be hosted by the local webhost.

There are far too many potential applications and configurations to list them here in detail. The site contains HTML, CSS, and JavaScript so should not be complex to host, however I would recommend sticking to the hosted site on [GitHub Pages](https://bweeks101.github.io/C4/).

## Credits

Connect 4 board game from [Hasbro](https://products.hasbro.com/en-gb/product/connect-4-game:80FB5BCA-5056-9047-F5F4-5EB5DF88DAF4)
Flex based 'Sticky Footer from [CSS-Tricks](https://css-tricks.com/couple-takes-sticky-footer/) and [Philip Walton](https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/)
SideNav from [W3 Schools Example](https://www.w3schools.com/howto/howto_js_sidenav.asp)
Customised Select Control from [W3 Schools Example](https://www.w3schools.com/howto/howto_custom_select.asp)
Animation Function Structure from [W3 Schools Example](https://www.w3schools.com/howto/howto_js_animate.asp)
Change colour of svg on hover (mask method) from [CSS-Tricks.com](https://css-tricks.com/change-color-of-svg-on-hover/#use-a-mask-instead-of-a-background-image)

### Content

All text content written by myself.  

### Acknowledgements

I received inspiration for this project from my mentor, Adegbenga Adeye (@gbenga_mentor), and the Hasbro board game 'Connect 4'.

### Research:

* CI Course Material and example projects
* W3C Schools [CSS](https://www.w3schools.com/css/default.asp/), [HTML](https://www.w3schools.com/html/default.asp/) and [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) Documentation
*  [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) Documentation
* MDN web docs ([JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/))
*  [Adobe Colour Wheel](https://color.adobe.com/create/color-wheel/)
*  [ColorHexa.com](https://www.colorhexa.com/)
*  [Coolors.co](https://coolors.co/)
*  [CSS-Tricks.com](https://css-tricks.com/)
*  [Stack Overflow](https://stackoverflow.com/)*

*It is almost impossible to search for any coding related issue online without encountering Stack Overflow links towards the top of the results. Whilst I certainly read Stack Overflow when researching solutions to challenges, I have not (to the best of my recollection or per my notes) utilised any code directly, in whole or in part.