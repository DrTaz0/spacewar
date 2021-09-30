
import { _decorator, Component, Collider, GraphicsComponent, Graphics, Vec3, UITransform, Rect, game, Vec2, ICollisionEvent } from 'cc';
import { Enemy } from './enemy';
import { Hud } from './hud';
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

        var collider = this.getComponent(Collider);
        collider.on("onTriggerEnter", this.onTriggerEnter, this);
    }

    update (dt: number) {
        this.move(dt);
        this.checkInsideScreen();
    }

    move(dt: number)
    {
        var pos = this.node.worldPosition;
        pos.set(pos.x + this.speed * dt, pos.y, pos.z);
        this.node.worldPosition = pos;
    }

    checkInsideScreen()
    {
        var pos = this.node.position;
        var pos2d = new Vec2(pos.x, pos.y);
        if (!this.getScreenRect().contains(pos2d))
        {
            this.destroy();
        }
        
    }

    protected getScreenRect() : Rect
    {
        var canvas = this.node.parent.getComponent(UITransform);
        return new Rect(-canvas.width / 2.0,
                        -canvas.height / 2.0,
                        canvas.width,
                        canvas.height);
    }

    onTriggerEnter (event: ICollisionEvent) {
        if (event.otherCollider.getComponent(Enemy) != null)
        {
            if (Hud.getInstance() != null)
            {
                Hud.getInstance().addPoints(100);
            }
        }
        event.otherCollider.node.destroy();
        this.node.destroy();
    }

    onDestroy()
    {
        var graphic = this.getComponent(Graphics);
        graphic.clear();
    }
}
