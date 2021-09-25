
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('ScheduleDestruction')
export class ScheduleDestruction extends Component {
    
    @property seconds : number = 3.0;

    start () {
        this.scheduleDestruction();
    }

    scheduleDestruction() {
        director.getScheduler().schedule(this.destroy, this, this.seconds);
    }

    onDestroy()
    {
        this.node.destroy();
    }

}
