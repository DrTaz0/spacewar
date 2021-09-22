
import { _decorator, Component, Node, director, game, clamp, Prefab, instantiate} from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('EnemyManager')
export class EnemyManager extends Component {
    
    @property minSpawnDelay : number = 1;
    @property maxSpawnDelay : number = 5;
    @property difficulty : number = 1;
    @property({type: Prefab}) enemy = null;
    @property({type: Node}) spawnPoint = null;

    start () {
        this.scheduleSpawn();
    }

    scheduleSpawn() {
        var difficultyFactor = clamp((game.totalTime / 1000) * (this.difficulty / 10), 1, Infinity);
        director.getScheduler().schedule(this.spawnEnemy, this, 
            (this.minSpawnDelay + Math.random() * this.maxSpawnDelay) / difficultyFactor);
    }

    spawnEnemy(difficultyFactor: number)
    {
        //console.log("Enemy Spawned " + game.totalTime);
        this.scheduleSpawn();
        var enemy = instantiate(this.enemy) as Node;
        director.getScene().addChild(enemy);
        enemy.parent = this.node.parent;
        enemy.worldPosition = this.spawnPoint.worldPosition;
    }
}
