
import { _decorator, Component, Node, math, game, randomRange } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('EnemySpawPoint')
export class EnemySpawPoint extends Component {

    update (dt: number) {
        var y = randomRange(-250, 250);
        var pos = this.node.position;
        pos.set(pos.x, y, pos.z);
        this.node.position = pos;
    }
}
