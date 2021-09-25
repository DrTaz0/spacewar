
import { _decorator, Component, Node, Prefab, instantiate, director, AudioClip, AudioSource } from 'cc';
import { Bullet } from './bullet';
const { ccclass, property } = _decorator;

 
@ccclass('Shooter')
export abstract class Shooter extends Component {
    
    @property({type:Prefab}) bulletPrefab = null;
    @property({type:AudioClip}) shootSound = null;

    @property speed : number = 500.0;

    shoot () {
        var bullet = instantiate(this.bulletPrefab) as Node;
        bullet.getComponent(Bullet).speed = this.speed;
        director.getScene().addChild(bullet);
        bullet.parent = this.node.parent.parent;
        bullet.worldPosition = this.node.worldPosition;

        if (this.getComponent(AudioSource) != null)
        {
            //this.getComponent(AudioSource).stop();
            this.getComponent(AudioSource).playOneShot(this.shootSound);
        }
    }

}

