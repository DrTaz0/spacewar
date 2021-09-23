
import { _decorator, Component, Collider, GraphicsComponent, Graphics, Vec3, UITransform, Rect, game, Vec2, ICollisionEvent } from 'cc';
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
        return new Rect(-game.container.clientWidth / 2.0,
                        -game.container.clientHeight / 2.0,
                        game.container.clientWidth,
                        game.container.clientHeight);
    }

    onTriggerEnter (event: ICollisionEvent) {
        event.otherCollider.node.destroy();
        this.node.destroy();
    }

    onDestroy()
    {
        var graphic = this.getComponent(Graphics);
        graphic.clear();
    }
}
