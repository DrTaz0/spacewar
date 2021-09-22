
import { _decorator, Component, EventKeyboard, KeyCode, systemEvent, SystemEvent, director } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('SceneChanger')
export class SceneChanger extends Component {

    @property sceneName: string = "";

    start () {
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode == KeyCode.SPACE)
        {
            director.loadScene(this.sceneName);
        }
    }
}
