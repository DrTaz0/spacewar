
import { _decorator, Component, Node, GraphicsComponent, Graphics, Vec3, instantiate, Prefab, director, Vec2, Rect, game, Game } from 'cc';
import { GameManager } from './gameManager';
import { Hud } from './hud';
const { ccclass, property } = _decorator;
 
@ccclass('Enemy')
export class Enemy extends Component {
   
    outOfBounds = false;

    @property speed : number = 100.0;
    @property({type:Prefab}) explosion = null;

    update (dt: number) {
        this.move(dt);
        this.checkInsideScreen();
    }

    move(dt: number)
    {
        var pos = this.node.worldPosition;
        pos.set(pos.x - this.speed * dt, pos.y, pos.z);
        this.node.worldPosition = pos;
    }

    onDestroy()
    {
        if (!this.outOfBounds && this.explosion != null && !GameManager.gameOver)
        {
            var explosion = instantiate(this.explosion) as Node;
            director.getScene().addChild(explosion);
            explosion.parent = this.node.parent;
            explosion.worldPosition = this.node.worldPosition;
        }
    }

    checkInsideScreen()
    {
        var pos = this.node.position;
        var pos2d = new Vec2(pos.x, pos.y);
        if (!this.getScreenRect().contains(pos2d))
        {
            this.outOfBounds = true
            this.destroy();
        }
    }

    protected getScreenRect() : Rect
    {
        return new Rect(-game.container.clientWidth / 2.0 -300,
                        -game.container.clientHeight / 2.0 -300,
                        game.container.clientWidth + 600,
                        game.container.clientHeight + 600);
    }
}
