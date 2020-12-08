/* Global settings objects*/
class navBarDefaultColors {
    constructor() {        
        this.darkToggler = "rgba(250,250,250,.4)";
        this.togglerHoverBorder = "rgba(236,76,76,.4)";
        this.togglerBackground = "#EC4C4C";
        this.togglerHoverIcon = "#EC4C4C";
        this.togglerIconMaskURL = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28250, 250, 250, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e";
        this.togglerIconBackground = "#fafafa";
    }
}

class sideNavDefaultColors {
    constructor() {
        this.docOverlayBackground = "rgba(0, 0, 0, 0)";
        this.background = "rgba(45,45,45,.95)";
        this.divider = "#fafafa";
        this.link = "#fafafa";
        this.linkHover = "#EC4C4C";
    }
}

class dataGridDefaultColors {
    constructor() {
        this.colSelected = "#EC4C4C";
        this.rowSelected = "#EC4C4C";
        this.border = "#fafafa";
    }
}

class gameDefaultColors {
    constructor() {
        this.border = "#fafafa";
        this.p1Background = "#EC4C4C";
        this.p2Background = "#0000FF";
        this.feedbackBackground = "2D2D2D";
        this.feedbackText = "#fafafa";
    }
}

class playerSettings {
    constructor() {
        this.name;
        this.tokenColor;
        this.altTokenColor;
    }
}

class gameSettings {
    constructor() {
        this.state;
        this.activePlayer;
        this.completedTurns = 0;
        this.turnTimeLimit = 30;
        this.activeTurnTimer;
        this.boardState = [
            [undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, undefined]
        ];
        this.colors = new gameDefaultColors();
        this.p1 = new playerSettings();        
        this.p1.name = "Player 1";
        this.p1.tokenColor = this.colors.p1Background;
        this.p1.altTokenColor = this.colors.p2Background;
        this.p2 = new playerSettings();
        this.p2.name = "Player 2";
        this.p2.tokenColor = this.colors.p2Background;
        this.p2.altTokenColor = this.colors.p1Background;
    }
}

class appDefaultColors {
    constructor() {
        this.text = "#fafafa";
        this.border = "#fafafa";
        this.background = "#262626";
        this.altBackground = "#2D2D2D";
        this.headerDivider = "#CCCCCC";
        this.footerDivider = "#CCCCCC";
        this.socialMediaLink = "#fafafa";
        this.socialMediaLinkHover = "#EC4C4C";
        this.navBar = new navBarDefaultColors();
        this.sideNav = new sideNavDefaultColors();
        this.dataGrid = new dataGridDefaultColors();
    }
}

class appGlobals {
    constructor() {
        this.colors = new appDefaultColors();
        this.game = new gameSettings();
    }
}