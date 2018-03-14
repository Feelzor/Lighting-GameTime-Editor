//=============================================================================
// LNM_GameEditorCore.js
//=============================================================================

/*:
 * @plugindesc v1.1.0 The core for plugins that have an in-game editor.
 * @author Sebastián Cámara, continued by FeelZoR
 *
 * @help
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.1.0:
 * -- FeelZoR continues development
 * 
 * Version 1.00:
 * -- Plugin published.
 */

var GameEditor = GameEditor || {};
GameEditor.ACTIVE = false;
GameEditor.TOOLS = {};
var $gameEditor = null;

//-----------------------------------------------------------------------------
// rgbToHex
//
// It converts RGB to HEX colors (thanks to Victor Engine).

GameEditor.rgbToHex = function(r, g, b) {
    r = Math.floor(r).toString(16).padZero(2);
    g = Math.floor(g).toString(16).padZero(2);
    b = Math.floor(b).toString(16).padZero(2);
    return '#' + r + g + b;
};

//-----------------------------------------------------------------------------
// StorageManager
//
// Returns the folder on the computer that the game is running from. While this
// works on any platform, it only really matters on the desktop clients, as
// that's where we have access to the filesystem.

StorageManager.localContentPath = function() {
    var path = window.location.pathname.replace(/\/[^\/]*$/, '');
    if (path.match(/^\/([A-Z]:)/)) {
        path = path.slice(1);
    }
    if (path.lastIndexOf("/") !== path.length - 1) {
        path += "/";
    }
    return decodeURIComponent(path);
};

//-----------------------------------------------------------------------------
// Graphics._onKeyDown
//
// Toggle the editor by pressing Tab.

Graphics._callEditor_onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
            case 9: // Tab
                event.preventDefault();
                if ($gameTemp.isPlaytest()) {
                    if (SceneManager._scene instanceof Scene_Map) {
                        $gameEditor.toggle();
                    }
                }
                break;
        }
    }
    return this._callEditor_onKeyDown(event);
};

//-----------------------------------------------------------------------------
// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.

ImageManager.loadEditor = function(filename, hue) {
    return this.loadBitmap('img/editor/', filename, hue, false);
};

//-----------------------------------------------------------------------------
// Scene_Map
//
// The scene class of the map screen.

var GameEditor_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
    if (GameEditor.ACTIVE) return;
    GameEditor_Scene_Map_processMapTouch.call(this);
};

Scene_Map.prototype.onMapLoaded = function() {
    if (this._transfer) {
        $gamePlayer.performTransfer();
    }
    this.createDisplayObjects();
    $gameEditor = new Game_Editor;
    this.addChild($gameEditor);
};

//-----------------------------------------------------------------------------
// Game_Editor
//
//

function Game_Editor() {
    this.initialize.apply(this, arguments);
}

Game_Editor.prototype = Object.create(PIXI.Container.prototype);
Game_Editor.prototype.constructor = Game_Editor;

Game_Editor.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._buttons = 0;
};

Game_Editor.prototype.addButton = function(filename, callback) {
    this.addChild(new ButtonImage(44 * this._buttons + 12, Graphics.height - 48, filename, function() {
        callback();
    }));
    this._buttons++;
};

Game_Editor.prototype.update = function() {
    this.visible = GameEditor.ACTIVE;
    if (GameEditor.ACTIVE) {
        this.children.forEach(function(child) {
            if (child.update) {
                child.update();
            }
        });
    }
};

Game_Editor.prototype.toggle = function() {
    GameEditor.ACTIVE = !GameEditor.ACTIVE;
};

//-----------------------------------------------------------------------------
// Label
//
//

function Label() {
    this.initialize.apply(this, arguments);
}

Label.prototype = Object.create(Sprite.prototype);
Label.prototype.constructor = Label;

Label.prototype.initialize = function(x, y, text, align, fontSize, fontBold) {
    Sprite.prototype.initialize.call(this);
    this.x = x;
    this.y = y;
    this.text = text;
    this.align = align || 'center';
    this._setAnchor();
    this.bitmap = new Bitmap(this.text.length * 10, 25);
    this.bitmap.fontFace = 'Arial';
    this.bitmap.fontSize = fontSize || 14;
    this.bitmap.fontBold = fontBold || false;
};

Label.prototype._setAnchor = function() {
    switch (this.align) {
        case 'left':
            this.anchor = new PIXI.Point(0.0, 0.5);
            break;
        case 'center':
            this.anchor = new PIXI.Point(0.5, 0.5);
            break;
        case 'right':
            this.anchor = new PIXI.Point(1.0, 0.5);
            break;
    }
};

Label.prototype.setText = function(text) {
    this.text = text;
    this.bitmap.width = this.text.length * 10;
};

Label.prototype.update = function() {
    var text = this.text;
    var width = this.bitmap.width;
    var height = this.bitmap.height;
    var align = this.align;
    this.bitmap.clear();
    this.bitmap.drawText(text, 0, 0, width, height, align);
};

//-----------------------------------------------------------------------------
// ButtonSlider
//
//

function ButtonSlider() {
    this.initialize.apply(this, arguments);
}

ButtonSlider.prototype = Object.create(PIXI.Container.prototype);
ButtonSlider.prototype.constructor = ButtonSlider;

ButtonSlider.prototype.initialize = function(x, y, width, min, max, callback) {
    PIXI.Container.call(this);
    this.x = x;
    this.y = y;
    this.min = min;
    this.max = max;
    this.barWidth = width;
    this._callback = callback || null;
    this.value = null;
    this._createBar();
    this._createDrag();
};

ButtonSlider.prototype._createBar = function() {
    this._bar = new Sprite();
    this._bar.bitmap = new Bitmap(this.barWidth, 5);
    this.addChild(this._bar);
};

ButtonSlider.prototype._createDrag = function() {
    this._drag = new Sprite();
    this._drag.bitmap = new Bitmap(6, 32);
    this._drag.anchor = new PIXI.Point(0.5, 0.5);
    this.addChild(this._drag);
};

ButtonSlider.prototype.update = function() {
    this._updateBitmaps();
    this._updateMouseBehavior();
};

ButtonSlider.prototype._updateBitmaps = function() {
    this._bar.bitmap.clear();
    this._bar.bitmap.fillRect(0, 0, this.barWidth, 5, 'black');
    this._drag.bitmap.clear();
    this._drag.bitmap.fillRect(0, 0, 6, 32, 'white');
};

ButtonSlider.prototype._updateMouseBehavior = function() {
    if (TouchInput.isPressed()) {
        if (this.isTriggered()) {
            this._dragging = true;
        }
    }
    if (TouchInput.isReleased()) {
        this._dragging = false;
    }
    if (this._dragging === true) {
        this.drag();
    }
};

ButtonSlider.prototype.drag = function() {
    var mx = TouchInput.x;
    var position = mx - this.x;
    if (position < 0) position = 0;
    if (position > this.barWidth) position = this.barWidth;
    this._drag.x = position;
    this._updateValue(this._drag.x);
};

ButtonSlider.prototype.setValue = function(value) {
    this.value = value;
    this._drag.x = Math.floor((this.barWidth / this.max) * value);
};

ButtonSlider.prototype._updateValue = function(x) {
    var lastValue = this.value;
    this.value = Math.floor((x / this.barWidth) * (this.max - this.min));
    if (this.value !== lastValue) {
        this.onChange(this.value);
    }
};

ButtonSlider.prototype.onChange = function(value) {
    this._callback.call(this, value);
};

ButtonSlider.prototype.isTriggered = function() {
    var mx = TouchInput.x;
    var my = TouchInput.y;
    var rect = this.getRect();
    return (mx >= rect.x && mx <= rect.x + rect.width &&
        my >= rect.y && my <= rect.y + rect.height);
};

ButtonSlider.prototype.getRect = function() {
    var x = this.x + this._drag.x - (this._drag.width / 2);
    var y = this.y + this._drag.y - (this._drag.height / 2);
    var width = this._drag.width;
    var height = this._drag.height;
    return new Rectangle(x, y, width, height);
};

//-----------------------------------------------------------------------------
// ButtonBase
//
//

function ButtonBase() {
    this.initialize.apply(this, arguments);
}

ButtonBase.prototype = Object.create(Sprite.prototype);
ButtonBase.prototype.constructor = ButtonBase;

ButtonBase.prototype.initialize = function(x, y, callback, hold) {
    Sprite.prototype.initialize.call(this);
    this.x = x;
    this.y = y;
    this._callback = callback || null;
    this._hold = hold || false;
    this._holdTime = this._holdFrameCount = 10;
};

ButtonBase.prototype.update = function() {
    if (TouchInput.isTriggered()) {
        if (this.isTriggered()) {
            this.onClick();
        }
    }
    if (TouchInput.isReleased()) {
        this.onRelease();
        this._holdFrameCount = this._holdTime;
    }
    if (!this._hold) return;
    if (TouchInput.isPressed()) {
        this._holdFrameCount--;
        if (this._holdFrameCount <= 0 && this.isTriggered()) {
            this.onClick();
            this._holdFrameCount = this._holdTime;

        }
    }
};

ButtonBase.prototype.onClick = function() {
    this.alpha = 0.5;
    if (this._callback) this._callback.call(this);
};

ButtonBase.prototype.onRelease = function() {
    this.alpha = 1;
};

ButtonBase.prototype.isTriggered = function() {
    var mx = TouchInput.x;
    var my = TouchInput.y;
    return (mx >= this.x && mx <= this.x + this.width &&
        my >= this.y && my <= this.y + this.height);
};

//-----------------------------------------------------------------------------
// ButtonImage
//
//

function ButtonImage() {
    this.initialize.apply(this, arguments);
}

ButtonImage.prototype = Object.create(ButtonBase.prototype);
ButtonImage.prototype.constructor = ButtonImage;

ButtonImage.prototype.initialize = function(x, y, image, callback) {
    ButtonBase.prototype.initialize.call(this, x, y, callback);
    this.bitmap = ImageManager.loadEditor(image);
};

//-----------------------------------------------------------------------------
// ButtonText
//
//

function ButtonText() {
    this.initialize.apply(this, arguments);
}

ButtonText.prototype = Object.create(ButtonBase.prototype);
ButtonText.prototype.constructor = ButtonText;

ButtonText.prototype.initialize = function(x, y, text, callback, hold) {
    ButtonBase.prototype.initialize.call(this, x, y, callback, hold);
    this.text = text;
    this.bitmap = new Bitmap(this.text.length * 10, 25);
    this.bitmap.fontFace = 'Arial';
    this.bitmap.fontSize = 14;
};

ButtonText.prototype.update = function() {
    ButtonBase.prototype.update.call(this);
    var text = this.text;
    var width = this.bitmap.width;
    var height = this.bitmap.height;
    this.bitmap.clear();
    this.bitmap.fillRect(0, 0, width, height, 0x000000);
    this.bitmap.drawText(text, 0, 0, width, height, 'center');
};

//-----------------------------------------------------------------------------
// getColor
//
// Help function to get a HUE color.

GameEditor.getColor = function(h) {
    var color = [
        0xff0000, 0xff0400, 0xff0800, 0xff0d00, 0xff1100, 0xff1500, 0xff1900,
        0xff1e00, 0xff2200, 0xff2600, 0xff2a00, 0xff2f00, 0xff3300, 0xff3700,
        0xff3c00, 0xff4000, 0xff4400, 0xff4800, 0xff4d00, 0xff5100, 0xff5500,
        0xff5900, 0xff5e00, 0xff6200, 0xff6600, 0xff6a00, 0xff6e00, 0xff7300,
        0xff7700, 0xff7b00, 0xff7f00, 0xff8400, 0xff8800, 0xff8c00, 0xff9100,
        0xff9500, 0xff9900, 0xff9d00, 0xffa200, 0xffa600, 0xffaa00, 0xffae00,
        0xffb300, 0xffb700, 0xffbb00, 0xffbf00, 0xffc300, 0xffc800, 0xffcc00,
        0xffd000, 0xffd400, 0xffd900, 0xffdd00, 0xffe100, 0xffe500, 0xffea00,
        0xffee00, 0xfff200, 0xfff700, 0xfffb00, 0xffff00, 0xfbff00, 0xf6ff00,
        0xf2ff00, 0xeeff00, 0xeaff00, 0xe5ff00, 0xe1ff00, 0xddff00, 0xd9ff00,
        0xd5ff00, 0xd0ff00, 0xccff00, 0xc8ff00, 0xc4ff00, 0xbfff00, 0xbbff00,
        0xb7ff00, 0xb3ff00, 0xaeff00, 0xaaff00, 0xa6ff00, 0xa1ff00, 0x9dff00,
        0x99ff00, 0x95ff00, 0x90ff00, 0x8cff00, 0x88ff00, 0x84ff00, 0x80ff00,
        0x7bff00, 0x77ff00, 0x73ff00, 0x6fff00, 0x6aff00, 0x66ff00, 0x62ff00,
        0x5eff00, 0x59ff00, 0x55ff00, 0x51ff00, 0x4cff00, 0x48ff00, 0x44ff00,
        0x40ff00, 0x3bff00, 0x37ff00, 0x33ff00, 0x2fff00, 0x2aff00, 0x26ff00,
        0x22ff00, 0x1eff00, 0x1aff00, 0x15ff00, 0x11ff00, 0x0dff00, 0x09ff00,
        0x04ff00, 0x00ff00, 0x00ff04, 0x00ff08, 0x00ff0d, 0x00ff11, 0x00ff15,
        0x00ff1a, 0x00ff1e, 0x00ff22, 0x00ff26, 0x00ff2b, 0x00ff2f, 0x00ff33,
        0x00ff37, 0x00ff3c, 0x00ff40, 0x00ff44, 0x00ff48, 0x00ff4c, 0x00ff51,
        0x00ff55, 0x00ff59, 0x00ff5d, 0x00ff62, 0x00ff66, 0x00ff6a, 0x00ff6e,
        0x00ff73, 0x00ff77, 0x00ff7b, 0x00ff80, 0x00ff84, 0x00ff88, 0x00ff8c,
        0x00ff91, 0x00ff95, 0x00ff99, 0x00ff9d, 0x00ffa1, 0x00ffa6, 0x00ffaa,
        0x00ffae, 0x00ffb2, 0x00ffb7, 0x00ffbb, 0x00ffbf, 0x00ffc3, 0x00ffc8,
        0x00ffcc, 0x00ffd0, 0x00ffd5, 0x00ffd9, 0x00ffdd, 0x00ffe1, 0x00ffe6,
        0x00ffea, 0x00ffee, 0x00fff2, 0x00fff7, 0x00fffb, 0x00ffff, 0x00fbff,
        0x00f7ff, 0x00f2ff, 0x00eeff, 0x00eaff, 0x00e6ff, 0x00e1ff, 0x00ddff,
        0x00d9ff, 0x00d5ff, 0x00d0ff, 0x00ccff, 0x00c8ff, 0x00c3ff, 0x00bfff,
        0x00bbff, 0x00b7ff, 0x00b2ff, 0x00aeff, 0x00aaff, 0x00a6ff, 0x00a1ff,
        0x009dff, 0x0099ff, 0x0095ff, 0x0091ff, 0x008cff, 0x0088ff, 0x0084ff,
        0x0080ff, 0x007bff, 0x0077ff, 0x0073ff, 0x006eff, 0x006aff, 0x0066ff,
        0x0062ff, 0x005dff, 0x0059ff, 0x0055ff, 0x0051ff, 0x004cff, 0x0048ff,
        0x0044ff, 0x0040ff, 0x003cff, 0x0037ff, 0x0033ff, 0x002fff, 0x002bff,
        0x0026ff, 0x0022ff, 0x001eff, 0x001aff, 0x0015ff, 0x0011ff, 0x000dff,
        0x0008ff, 0x0004ff, 0x0000ff, 0x0400ff, 0x0900ff, 0x0d00ff, 0x1100ff,
        0x1500ff, 0x1a00ff, 0x1e00ff, 0x2200ff, 0x2600ff, 0x2a00ff, 0x2f00ff,
        0x3300ff, 0x3700ff, 0x3b00ff, 0x4000ff, 0x4400ff, 0x4800ff, 0x4c00ff,
        0x5100ff, 0x5500ff, 0x5900ff, 0x5e00ff, 0x6200ff, 0x6600ff, 0x6a00ff,
        0x6f00ff, 0x7300ff, 0x7700ff, 0x7b00ff, 0x8000ff, 0x8400ff, 0x8800ff,
        0x8c00ff, 0x9000ff, 0x9500ff, 0x9900ff, 0x9d00ff, 0xa100ff, 0xa600ff,
        0xaa00ff, 0xae00ff, 0xb300ff, 0xb700ff, 0xbb00ff, 0xbf00ff, 0xc400ff,
        0xc800ff, 0xcc00ff, 0xd000ff, 0xd500ff, 0xd900ff, 0xdd00ff, 0xe100ff,
        0xe500ff, 0xea00ff, 0xee00ff, 0xf200ff, 0xf600ff, 0xfb00ff, 0xff00ff,
        0xff00fb, 0xff00f7, 0xff00f2, 0xff00ee, 0xff00ea, 0xff00e5, 0xff00e1,
        0xff00dd, 0xff00d9, 0xff00d4, 0xff00d0, 0xff00cc, 0xff00c8, 0xff00c3,
        0xff00bf, 0xff00bb, 0xff00b7, 0xff00b3, 0xff00ae, 0xff00aa, 0xff00a6,
        0xff00a2, 0xff009d, 0xff0099, 0xff0095, 0xff0091, 0xff008c, 0xff0088,
        0xff0084, 0xff007f, 0xff007b, 0xff0077, 0xff0073, 0xff006e, 0xff006a,
        0xff0066, 0xff0062, 0xff005e, 0xff0059, 0xff0055, 0xff0051, 0xff004d,
        0xff0048, 0xff0044, 0xff0040, 0xff003c, 0xff0037, 0xff0033, 0xff002f,
        0xff002a, 0xff0026, 0xff0022, 0xff001e, 0xff0019, 0xff0015, 0xff0011,
        0xff000d, 0xff0008, 0xff0004
    ];
    return color[h];
};
