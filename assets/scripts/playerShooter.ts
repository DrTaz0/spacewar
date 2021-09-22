
import { _decorator, Component, Node, KeyCode, systemEvent, SystemEvent, EventKeyboard, director, serializeTag, resources, instantiate, Prefab, Asset } from 'cc';
import { Bullet } from './bullet';
import { Shooter } from './shooter';
const { ccclass, property } = _decorator;
 
@ccclass('PlayerShooter')
export class PlayerShooter extends Shooter {
    
    start () {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode == KeyCode.SPACE)
        {
            this.shoot();
        }
    }
}
