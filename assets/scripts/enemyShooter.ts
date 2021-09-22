
import { _decorator, Component, Node, KeyCode, systemEvent, SystemEvent, EventKeyboard, director, serializeTag, resources, instantiate, Prefab, Asset } from 'cc';
import { Shooter } from './shooter';
const { ccclass, property } = _decorator;
 
@ccclass('EnemyShooter')
export class EnemyShooter extends Shooter {
    
    @property minShootDelay : number = 1;
    @property maxShootDelay : number = 5;

    start () {
        this.scheduleShoot();
    }

    scheduleShoot() {
        director.getScheduler().schedule(this.shoot, this, this.minShootDelay + Math.random() * this.maxShootDelay);
    }

    shoot()
    {
        super.shoot();
        this.scheduleShoot();
    }
}
