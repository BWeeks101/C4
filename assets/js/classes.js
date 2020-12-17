/* Global settings objects*/
class playerSettings {
    constructor() {
        this.name;
        this.tokenColor;
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
        this.gBoardDG = new DataGrid(["","","","","","",""], this.boardState);        
        this.p1 = new playerSettings();        
        this.p1.name = "Player 1";
        this.p1.tokenColor = "#EC4C4C";
        this.p2 = new playerSettings();
        this.p2.name = "Player 2";
        this.p2.tokenColor = "#0000FF";
    }
}

class appGlobals {
    constructor() {
        this.game = new gameSettings();
        this.sideNavState = "closed";
        this.logoGrid = new DataGrid(["C","O","N","N","E","C","T","4"], [[undefined], [undefined], [undefined], [undefined], [undefined], [undefined], [undefined], [undefined]]);
    }
}