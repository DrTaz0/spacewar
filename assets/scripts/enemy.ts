
import { _decorator, Component, Node, GraphicsComponent, Graphics, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('Enemy')
export class Enemy extends Component {
   
    @property speed : number = 100.0;

    update (dt: number) {
        this.move(dt);
    }

    move(dt: number)
    {
        var pos = this.node.worldPosition;
        pos.set(pos.x - this.speed * dt, pos.y, pos.z);
        this.node.worldPosition = pos;
    }
}
