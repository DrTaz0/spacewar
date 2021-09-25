
import { _decorator, Component, Node, game, Game } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Fri Sep 24 2021 23:26:22 GMT+0200 (hora de verano de Europa central)
 * Author = DrTaz0
 * FileBasename = gameManager.ts
 * FileBasenameNoExtension = gameManager
 * URL = db://assets/scripts/gameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('GameManager')
export class GameManager extends Component {
    
    public static gameOver = false;
    public static startTime : number;

    start()
    {
        GameManager.startTime = game.totalTime;
    }
}
