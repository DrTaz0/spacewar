
import { _decorator, Component, director, systemEvent, game, SystemEvent, EventKeyboard, KeyCode, clamp, UITransform, Rect, Node, Prefab, instantiate, Collider, ICollisionEvent} from 'cc';
import { Enemy } from './enemy';
const { ccclass, property } = _decorator;
 
@ccclass('Ship')
export class Ship extends Component {
    
    vMov : number = 0.0;
    hMov : number = 0.0;

    @property speed : number = 250.0;
    @property({type:Prefab}) explosionPrefab = null;

    start () {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        var collider = this.getComponent(Collider);
        collider.on("onTriggerEnter", this.onTriggerEnter, this);
    }

    onTriggerEnter (event: ICollisionEvent) {
        if(event.otherCollider.getComponent(Enemy) != null)
        {
            this.node.destroy();
        }
    }

    onKeyDown(event: EventKeyboard) {

        switch (event.keyCode)
        {
            case KeyCode.ARROW_UP:    this.vMov = this.speed;  break;
            case KeyCode.ARROW_DOWN:  this.vMov = -this.speed; break;
            case KeyCode.ARROW_RIGHT: this.hMov = this.speed;  break;
            case KeyCode.ARROW_LEFT:  this.hMov = -this.speed; break;
        }
    }

    onKeyUp(event: EventKeyboard) {

        switch (event.keyCode)
        {
            case KeyCode.ARROW_UP:
                if (this.vMov > 0)
                {
                    this.vMov = 0;
                }
            break;

            case KeyCode.ARROW_DOWN:
                if (this.vMov < 0)
                {
                this.vMov = 0;
                }
                break;

            case KeyCode.ARROW_RIGHT:
                if (this.hMov > 0)
                {
                    this.hMov = 0;
                }
                break;

            case KeyCode.ARROW_LEFT:
                if (this.hMov< 0)
                {
                    this.hMov = 0;
                }
                break;
        }
    }

    update (dt: number) {
        this.move(dt)
        this.clampPosition();
    }

    private move(dt: number) {
        var pos = this.node.position;
        pos.set(pos.x + this.hMov * dt, pos.y + this.vMov * dt);
        this.node.position = pos;
    }

    private getScreenRect() : Rect
    {
        var sprite = this.getComponent(UITransform);
        return new Rect(-game.container.clientWidth / 2.0 + sprite.width / 2.0,
                        -game.container.clientHeight / 2.0 + sprite.height / 2.0,
                        game.container.clientWidth - sprite.width,
                        game.container.clientHeight - sprite.height);
    }

    private clampPosition() {
        var screenRect = this.getScreenRect();
        var x = clamp(this.node.position.x, screenRect.xMin, screenRect.xMax);
        var y = clamp(this.node.position.y, screenRect.yMin, screenRect.yMax);
        this.node.position.set(x, y);
    }

    onDestroy()
    {
        if (this.explosionPrefab != null)
        {
            var explosion = instantiate(this.explosionPrefab) as Node;
            director.getScene().addChild(explosion);
            explosion.parent = this.node.parent;
            explosion.worldPosition = this.node.worldPosition;
        }
    }
}
