import BaseEvent from '../BaseEvent';

/**
 * 设置场景事件
 * @param {*} app 
 */
function AddObjectEvent(app) {
    BaseEvent.call(this, app);
}

AddObjectEvent.prototype = Object.create(BaseEvent.prototype);
AddObjectEvent.prototype.constructor = AddObjectEvent;

AddObjectEvent.prototype.start = function () {
    var _this = this;
    this.app.on('addObject.' + this.id, function (object) {
        _this.onAddObject(object);
    });
};

AddObjectEvent.prototype.stop = function () {
    this.app.on('addObject.' + this.id, null);
};

AddObjectEvent.prototype.onAddObject = function (object) {
    var editor = this.app.editor;

    object.traverse(function (child) {

        if (child.geometry !== undefined) editor.addGeometry(child.geometry);
        if (child.material !== undefined) editor.addMaterial(child.material);

        editor.addHelper(child);

    });

    editor.scene.add(object);

    editor.signals.objectAdded.dispatch(object);
    editor.signals.sceneGraphChanged.dispatch();
};

export default AddObjectEvent;