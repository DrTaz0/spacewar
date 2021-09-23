
import { _decorator, Component, Node, GraphicsComponent, Graphics, Vec3, instantiate, Prefab, director } from 'cc';
import { Hud } from './hud';
const { ccclass, property } = _decorator;
 
@ccclass('Enemy')
export class Enemy extends Component {
   
    @property speed : number = 100.0;
    @property({type:Prefab}) explosion = null;

    update (dt: number) {
        this.move(dt);
    }

    move(dt: number)
    {
        var pos = this.node.worldPosition;
        pos.set(pos.x - this.speed * dt, pos.y, pos.z);
        this.node.worldPosition = pos;
    }

    onDestroy()
    {
        if (this.explosion != null)
        {
            var explosion = instantiate(this.explosion) as Node;
            director.getScene().addChild(explosion);
            explosion.parent = this.node.parent;
            explosion.worldPosition = this.node.worldPosition;
        }

        if (Hud.getInstance() != null)
        {
            Hud.getInstance().addPoints(100);
        }
    }
}
