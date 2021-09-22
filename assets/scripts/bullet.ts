
import { _decorator, Component, Node, Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    
    @property radius : number = 5.0;
    @property speed : number = 500.0;

    start () {
        var graphic = this.getComponent(Graphics);
        graphic.clear();
        graphic.circle(0,0, this.radius);
        graphic.stroke();
        graphic.fill();
    }

    update(dt:number)
    {
        this.move(dt);
    }

    move(dt:number)
    {
        var pos = this.node.worldPosition;
        pos.set(pos.x + this.speed * dt, pos.y, pos.z);
        this.node.worldPosition = pos;
    }
}
