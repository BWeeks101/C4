# C4

C4 is a javascript version of the classic 'Connect 4' board game, from Hasbro.

Unlike the traditional game, C4's twist limits each players turn to 5s by default (this can be adjusted up to 30s if the player is finding things too challenging).

## UX
 
C4 has a light, minimalist design - it is a single responsive page with no images beyond social media icons.  The site is functional on desktops, laptops and mobile devices, with a minimum supported resolution of 360px x 620px.

C4, (based on the classic 'Connect 4' game from Hasbro), is quick and easy to play, yet difficult to master.  Using the default setting of 5s per player turn, a single game will be completed in under 4 minutes.  This makes it ideal for play with a friend during short work/education breaks, or whilst waiting for the kettle to boil!

###User Stories

1. As a User, I want to be able to play C4 with a real opponent in 'couch co-op' so that I can involve my immediate family and friends
2. As a User, I want to be able to play C4 with a real opponent online so that I can play when a local opponenent is not available
3. As a User, I want to be able to play C4 against an AI opponent so that I can practice on my own
4. As a User, I want to be able to review my results vs those of other players so that I can monitor my performance
5. As a User, I want to be able to customise my profile and playing pieces so that my experience is more unique
6. As a User, I want to be able to alter the difficulty of the AI in single player games to provide a challenge regardless of my skill level
7. As a User, I want to be able to adjust the challenge of the game by altering time limits for each turn to further refine challenge and the game experience
8. As a User, I want to be able to use the site effectively on mobile devices, tablets, laptops, and desktops so that I am not limited to playing in a single location or with a single device
9. As a User, I want to be able to review the rules to the game so that I can learn how to play

###Wireframes

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

## Technologies Used
* [HTML5](https://en.wikipedia.org/wiki/HTML5/)
* [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets/)
* [Javascript](https://javascript.com)
* [Bootstrap](https://getbootstrap.com)
    - The project uses **Bootstrap** to simplify flex layout, and assist with DOM manipulation via useful pre-built classes.
* [Font Awesome]{https://fontawesome.com/}
	- The project uses **Fontawesome** for social media link icons.

## Testing

All testing was conducted manually.<br><br>
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
		1. X button
		2. Color Mode
		3. Home
		4. Start Game
		5. User Settings
	6. Click the Back button to return to the default pane.
	
3. User Settings
	1. Load the page and click the User Settings button.
	2. The user settings pane will be displayed above a Back button.
	3. Enter text into the username boxes for both players. They will accept a maximum of 8 characters.
	4. Select token colurs for both players.  The button element will change to show the selected colour.
	5. Click the Back button to return to the default pane, then click the User Settings button again.
	6. Observe that the previously entered user names and selected colours are still set.
	7. Click the Default button for each player to reset their names and colours.
	8. SideNav
		1. Open the side Nav using the Nav button on the header
		2. Observe that the side Nav appears from the left
		3. Observe that the side Nav has the following options:
			1. X button
			2. Color Mode
			3. Home
			4. Start Game
			5. Rules
	9. Close the side Nav using either the X button, or by clicking off of the side Nav element
	10. Validation Alert
		1. Set both players with the same user name, and either click the back button, or open the sideNav and choose Home/Start Game/Rules.
		2. Observe that an alert box is displayed, detailing that players must have unique names.
		3. Observe that no links or buttons will function whilst the alert is displayed.
		4. Close the alert using either the Ok button or the X button.
		5. Ignore the user names, and change the colours so that they also match.
		6. Click the Back button again and observe that the Alert text has changed to detail that token colours must also be unique.
		7. Close the alert.
		8. Ignore the token colours.  Change the usernames so that they are unique.  Click the back button again.
		9. Observe that the Alert text has changed again to detail that token colours must be unique (with no mention of user names).
		10. Close the Alert, and alter the colours to be unique (or click the button(s) to set Default values for one or both players).
		11. Click the back button, or choose an option from the sideNav to load a different pane.  Observe that the data validates and the pane changes as expected.

2. SideNav:
	1. Click on the Nav button on the title bar to open the menu.
	2. Observe that the menu slides on from the left
	3. Observe that the menu does not fill the full width of the screen
	4. Click anywhere to the right of the open menu
		1. Observe that no links/buttons on background page are accessible whilst the sideNav is open
		2. Observe that clicking anywhere to the right of the open sideNav will cause it to close (sliding off to the left).
	5. 
In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits
Flex based 'Sticky Footer from [CSS-Tricks](https://css-tricks.com/couple-takes-sticky-footer/) and [Philip Walton](https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/)

SideNav from [W3 Schools Example](https://www.w3schools.com/howto/howto_js_sidenav.asp)

Customised Select Control from [W3 Schools Example](https://www.w3schools.com/howto/howto_custom_select.asp)

Animation Function Structure from [W3 Schools Example](https://www.w3schools.com/howto/howto_js_animate.asp)

Change colour of svg on hover (mask method) from [CSS-Tricks.com](https://css-tricks.com/change-color-of-svg-on-hover/#use-a-mask-instead-of-a-background-image)

### Content
- All text content written by myself.

### Acknowledgements

- I received inspiration for this project from the Hasbro boardgame 'Connect 4', and my mentor [Adegbenga Adeye][@gbenga_mentor]
