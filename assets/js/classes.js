/* playerSettings Object class */
/* Stores player names and token colours */
/* Used as subclass of gameSettings */
class playerSettings {
    constructor() {
        this.name;
        this.tokenColor;
    }
}

/* gameSettings Object class */
/* stores various properties relating to the game, board state and playerSettings objects */
/* Used as subclass of appGlobals */
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
        this.gBoardDG = new DataGrid(["","","","","","",""], this.boardState);        
        this.p1 = new playerSettings();        
        this.p1.name = "Player 1";
        this.p1.tokenColor = "#EC4C4C";
        this.p2 = new playerSettings();
        this.p2.name = "Player 2";
        this.p2.tokenColor = "#4B4BEC";
    }
}

/* logo object class */
/* stores logo datagrid object and animation states */
class logoSettings {
    constructor() {
        this.animState;
        this.grid = new DataGrid(["C","O","N","N","E","C","T","4"], [[undefined], [undefined], [undefined], [undefined], [undefined], [undefined], [undefined], [undefined]]);
    }
}

/* Parent global object class */
/* Created on load, stores gameSettings object, sideNavState and logoGrid */
class appGlobals {
    constructor() {
        this.game = new gameSettings();
        this.logo = new logoSettings();
        this.uiState = "default";
        this.sideNavState = "closed";        
    }
}