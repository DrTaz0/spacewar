
import { _decorator, Component, Node, Label, sys } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('Hud')
export class Hud extends Component {

    static HIGH_SCORE_KEY : string = "highScore";

    score : number = 0;
    highScore : number;

    defaultHighScore = 500;

    private static instance : Hud;
    
    @property({type:Label}) scoreLabel = null;
    @property({type:Label}) highScoreLabel = null;

    public static getInstance() : Hud {
        return Hud.instance;
    }

    start () {
        Hud.instance = this;
        var value = sys.localStorage.getItem(Hud.HIGH_SCORE_KEY);
        this.highScore = this.defaultHighScore;
        this.refreshHighScore();
    }

    addPoints(points:number)
    {
        this.score += points;
        this.scoreLabel.string = this.score.toString();

        if (this.score > this.highScore)
        {
            this.highScore = this.score;
            this.refreshHighScore();
        }
    }

    refreshHighScore()
    {
        this.highScoreLabel.string = this.highScore.toString();
    }
    
}
