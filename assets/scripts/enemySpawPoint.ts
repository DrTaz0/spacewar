
import { _decorator, Component, Node, math, game } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('EnemySpawPoint')
export class EnemySpawPoint extends Component {
    
    @property speed : number = 1;

    update (dt: number) {
        var y = Math.sin((game.totalTime / 1000) * this.speed) * 250;
        var pos = this.node.position;
        pos.set(pos.x, y, pos.z);
        this.node.position = pos;
    }
}
