
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('Scroller')
export class Scroller extends Component {
    
    @property speed : number = -200;
    @property width : number = 1024;

    update (dt: number) {
        var x = this.node.position.x;
        x += this.speed * dt;
        if (x <= -this.width)
        {
            x += this.width * 2;
        }
        var pos = this.node.position;
        pos.set(x, pos.y, pos.z);
        this.node.position = pos;
    }
}
