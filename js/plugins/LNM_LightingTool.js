//=============================================================================
// LNM_LightingTool.js
//=============================================================================

GameEditor.TOOLS.Lighting = false;
var $gameLighting = null;
var $lights = ['Ambient', 'Torch', 'Bonfire'];

//=============================================================================
/*:
 * @plugindesc v1.4.1 Tool to add lighting to maps. Requires LNM_GameEditorCore.js
 * @author Sebastián Cámara, continued by FeelZoR
 *
 * @requiredAssets img/editor/Lights.png
 * @requiredAssets img/editor/LightSource.png
 * @requiredAssets img/lights/default.png
 * @requiredAssets img/lights/player_torch_2.png
 * @requiredAssets img/lights/player_torch_4.png
 * @requiredAssets img/lights/player_torch_6.png
 * @requiredAssets img/lights/player_torch_8.png
 *
 * @param Incompatibility fix
 * @desc true if you are experiencing incompatibilities with another plugin. Put this one at the bottom of the list.
 * @default false
 *
 * @param ---Player torch---
 * @default
 *
 * @param Player Torch 4 Directions
 * @desc true if the player torch must use 4 different
 * files for all directions.
 * @default false
 *
 * @param Player Torch Switch
 * @desc To activate or deactivate player's torch
 * @default 1
 *
 * @param Player Torch Filename
 * @desc Sprite used for the light, located in /img/lights/
 * @default default
 *
 * @param Player Torch Color
 * @desc Tint scale for colors from 0 to 359
 * @default 18
 *
 * @param Player Torch Scale
 * @desc 1.0 = 100%, 2.0 = 200%, etc
 * @default 2.0
 *
 * @param Player Torch Alpha
 * @desc Transparency of the light, from 0.1 to 1.0
 * @default 1.0
 *
 * @param Player Torch Offset X
 * @default 0
 *
 * @param Player Torch Offset Y
 * @default -12
 *
 * @param Player Torch pulseMin
 * @desc Minimum scaling for pulse animation
 * @default 2.0
 *
 * @param Player Torch pulseMax
 * @desc Maximum scaling for pulse animation
 * @default 2.10
 *
 * @param Player Torch pulseSpeed
 * @desc Speed for pulse animation
 * @default 7
 *
 * @param Player Torch flickIntensity
 * @desc Intensity for flick animation
 * @default 1
 *
 * @param Player Torch flickSpeed
 * @desc Speed for flick animation
 * @default 3
 *
 * @param ---Default Bonfire---
 * @default
 *
 * @param Bonfire Filename
 * @desc Sprite used for the light, located in /img/lights/
 * @default default
 *
 * @param Bonfire Color
 * @desc Tint scale for colors from 0 to 359
 * @default 28
 *
 * @param Bonfire Scale
 * @desc 1.0 = 100%, 2.0 = 200%, etc
 * @default 1.3
 *
 * @param Bonfire Alpha
 * @desc Transparency of the light, from 0.1 to 1.0
 * @default 1.0
 *
 * @param Bonfire pulseMin
 * @desc Minimum scaling for pulse animation
 * @default 1.1
 *
 * @param Bonfire pulseMax
 * @desc Maximum scaling for pulse animation
 * @default 1.3
 *
 * @param Bonfire pulseSpeed
 * @desc Speed for pulse animation
 * @default 15
 *
 * @param Bonfire flickIntensity
 * @desc Intensity for flick animation
 * @default 1
 *
 * @param Bonfire flickSpeed
 * @desc Speed for flick animation
 * @default 3
 *
 * @param ---Default Torch---
 * @default
 *
 * @param Torch Filename
 * @desc Sprite used for the light, located in /img/lights/
 * @default default
 *
 * @param Torch Color
 * @desc Tint scale for colors from 0 to 359
 * @default 15
 *
 * @param Torch Scale
 * @desc 1.0 = 100%, 2.0 = 200%, etc
 * @default 1.0
 *
 * @param Torch Alpha
 * @desc Transparency of the light, from 0.1 to 1.0
 * @default 1.0
 *
 * @param Torch pulseMin
 * @desc Minimum scaling for pulse animation
 * @default 0.98
 *
 * @param Torch pulseMax
 * @desc Maximum scaling for pulse animation
 * @default 1.02
 *
 * @param Torch pulseSpeed
 * @desc Speed for pulse animation
 * @default 7
 *
 * @param Torch flickIntensity
 * @desc Intensity for flick animation
 * @default 1
 *
 * @param Torch flickSpeed
 * @desc Speed for flick animation
 * @default 3
 *
 * @param ---Default Ambient---
 * @default
 *
 * @param Ambient Filename
 * @desc Sprite used for the light, located in /img/lights/
 * @default default
 *
 * @param Ambient Color
 * @desc Tint scale for colors from 0 to 359
 * @default 28
 *
 * @param Ambient Scale
 * @desc 1.0 = 100%, 2.0 = 200%, etc
 * @default 5.0
 *
 * @param Ambient Alpha
 * @desc Transparency of the light, from 0.1 to 1.0
 * @default 0.5
 *
 * @help
 * ============================================================================
 * How to use
 * ============================================================================
 *
 * You can add lights in two ways:
 *  1. From the in-game editor.
 *  2. From events.
 *
 * Adding lights in-game
 * Press TAB and then press over the lamp icon. Then select the type of light
 * you want to add. You can drag and edit your properties at any time.
 *
 * Adding custom lights from events
 * Simply create an event and then in the field “Note” add the following line:
 *
 * Light(filename, scale, hue, alpha).addPulse(pulseMin, pulseMax, pulseSpeed)
 * .addFlick(flickIntensity, flickSpeed)
 *
 * Filename: (string) Sprite used for the light, located in /img/lights/
 * Scale: (float) Scales the sprite (1.0 = 100%, 0.5 = 50%, etc)
 * Hue: (integer) Tint scale for colors from 0 to 359. For more information
 * visit https://en.wikipedia.org/wiki/File:HueScale.svg
 * Alpha: (float) Transparency of the light, from 0.1 to 1.0
 * pulseMin: (float) Minimum scaling for pulse animation
 * pulseMax: (float) Maximum scaling for pulse animation
 * pulseSpeed: (integer) Speed for pulse animation
 * flickIntensity: (integer) Intensity for flick animation
 * flickSpeed: (integer) Speed for flick animation
 *
 * -- Examples:
 * Ambient
 * Light(default, 5.0, 28, 1.0)
 *
 * Torch
 * Light(default, 15, 1.0, 1.0).addPulse(0.98, 1.02, 7).addFlick(1, 3)
 *
 * Bonfire
 * Light(default, 28, 1.3, 1.0).addPulse(1.1, 1.3, 15).addFlick(1, 3)
 *
 * Adding default lights from events
 * You can also create default lights by simply typing Torch, Bonfire or
 * Ambient in the field “Note”.
 *
 * ============================================================================
 * Commands
 * ============================================================================
 *
 * For the following commands, light_id is the id of the light. It can be found
 * in the In-Game editor on the top right corner of the screen. For event
 * lights, the id starts with an e and is followed by the id of the event
 * (without the first 0). For example, the light for event 0042 will have id
 * “e42”.
 *
 * Light ON light_id - Turns on the light with the corresponding id (can be
 *                        found in the editor).
 *
 * Light OFF light_id - Turns off the light with the corresponding id (can be
 *                      found in the editor).
 *
 * Light LIMIT time_begin time_end light_id
 * Turns on and off the light with the corresponding id (can be found in the
 * editor) automatically depending on the time.
 * eg: Light LIMIT 22:00 6:00 1 will turn on the light with id 1 between
 *     10:00pm and 6:00am.
 *
 * Light HUE hue_value light_id
 * Changes the color of the light with the corresponding id temporarily
 * (just in the current save) to the one specified by the hue.
 * eg: Light HUE 120 4 will make the light with id 4 green
 *
 * Light HUE RESET light_id
 * Removes the temporary color of the light with the corresponding id and use
 * the default light color again.
 * N.B. : REMOVE can be used instead of RESET.
 * eg: Light HUE RESET 2 will remove the temporary color of the light with id 2
 * 
 * ============================================================================
 * Player torch
 * ============================================================================
 *
 * You can activate or deactivate the player’s torch by simply activating or
 * deactivating the corresponding switch. By default it is #0001, but you can
 * change it from the Plugin Manager.
 *
 * You can also use a 4 directions torch. If you want to do so, just set the
 * "Player Torch 4 Directions" parameter to "true" (without the quotes) and
 * create 4 files. They will all start with the name set in the parameter
 * "Player Torch Filename" followed by "_2" for the light when the player looks
 * down, "_4" when the player looks left, "_6"  when the player looks right and
 * "_8" when the player looks up (arrows used on the numpad, if it helps).
 *
 * For example, if you activate the 4 directions torch and have set the "Player
 * Torch Filename" to "player_torch", you will have four files:
 *   • "player_torch_2.png" - When the player looks down.
 *   • "player_torch_4.png" - When the player looks left.
 *   • "player_torch_6.png" - When the player looks right.
 *   • "player_torch_8.png" - When the player looks up.
 *
 * These files are provided by default with the plugin, but you can change them
 * to whatever you want.
 *
 * ============================================================================
 * Special thanks
 * ============================================================================
 *
 * Xelion for helping me with the translations.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.4.1:
 * * Correct a bug where parameters would not be taken in account.
 *
 * Version 1.4.0:
 * + Add the possibility to use commands on event lights.
 * + Add the possibility to set a temporary hue to lights.
 * * Correct a bug where turned off lights would turn on again after going in
 * the menu.
 *
 * Version 1.3.5:
 * * Correct technical problems
 *
 * Version 1.3.4:
 * * Solved a bug where Light LIMIT would turn on lights again after a battle,
 *   even if they aren't supposed to be turned on.
 *
 * Version 1.3.3:
 * + Added an "Incompatibility" mode for those using, for example, "TDDP Bind
 *   Pictures To Map" plugin. This plugin has to be below the problematic
 *   plugin in order to function correctly.
 *
 * Version 1.3.2:
 * + Added required assets.
 * * Corrected a bug where copy/pasting a light would not show flick / pulse
 *   animations until game restart.
 * * Corrected a bug where browser version would crash.
 *   CAREFUL: THE BROWSER VERSION DOES NOT SUPPORT LIGHT CREATION, IT MAY CRASH
 *
 * Version 1.3.1:
 * * Some performance improvements.
 * 
 * Version 1.3.0:
 * + Now lights follow the events if they move.
 * + Added the possibility to turn on and off lights created by the editor.
 * + Added the possibility to automatically turn on and off lights created by
 *   the editor depending on the time.
 * * Corrected a bug where null lights wouldn't be loaded correctly at start.
 * * Corrected a bug where dragging a light on the buttons would change its
 *   properties.
 * 
 * Version 1.2.0:
 * + Added the possibility to Copy and Paste selected light with CTRL + C and
 *   CTRL + V
 * + Added the possibility to Delete the selected light with the DELETE and the
 *      BACKSPACE key.
 * * Corrected a bug where if two lights were at the same place, dragging one
 *   would drag the other.
 * 
 * Version 1.1.0:
 * -- FeelZoR continues development
 * + Added the possibility to make the player torch follow the player's
 *   direction.
 *
 * Version 1.00:
 * -- Plugin published.
 */
//=============================================================================

//=============================================================================
// Parameter variables
//=============================================================================

GameEditor.Parameters = Object.assign({}, GameEditor.Parameters, PluginManager.parameters('LNM_LightingTool'));
GameEditor.TOOLS.IncompatibilityFix = String(GameEditor.Parameters['Incompatibility fix'] || false);
GameEditor.TOOLS.PlayerTorchFourDirections = String(GameEditor.Parameters['Player Torch 4 Directions'] || false);
GameEditor.TOOLS.PlayerTorchSwitch = Number(GameEditor.Parameters['Player Torch Switch'] || 1);
GameEditor.TOOLS.PlayerTorchFilename = String(GameEditor.Parameters['Player Torch Filename'] || 'default');
GameEditor.TOOLS.PlayerTorchColor = Number(GameEditor.Parameters['Player Torch Color'] || 18);
GameEditor.TOOLS.PlayerTorchScale = parseFloat(GameEditor.Parameters['Player Torch Scale'] || 2.0);
GameEditor.TOOLS.PlayerTorchAlpha = parseFloat(GameEditor.Parameters['Player Torch Alpha'] || 1.0);
GameEditor.TOOLS.PlayerTorchOffsetX = Number(GameEditor.Parameters['Player Torch Offset X'] || 0);
GameEditor.TOOLS.PlayerTorchOffsetY = Number(GameEditor.Parameters['Player Torch Offset Y'] || -12);
GameEditor.TOOLS.PlayerTorchPulseMin = parseFloat(GameEditor.Parameters['Player Torch pulseMin'] || 2.0);
GameEditor.TOOLS.PlayerTorchPulseMax = parseFloat(GameEditor.Parameters['Player Torch pulseMax'] || 2.10);
GameEditor.TOOLS.PlayerTorchPulseSpeed = parseInt(GameEditor.Parameters['Player Torch pulseSpeed'] || 7);
GameEditor.TOOLS.PlayerTorchFlickIntensity = parseInt(GameEditor.Parameters['Player Torch flickIntensity'] || 1);
GameEditor.TOOLS.PlayerTorchFlickSpeed = parseInt(GameEditor.Parameters['Player Torch flickSpeed'] || 3);
GameEditor.TOOLS.BonfireFilename = String(GameEditor.Parameters['Bonfire Filename'] || 'default');
GameEditor.TOOLS.BonfireColor = Number(GameEditor.Parameters['Bonfire Color'] || 28);
GameEditor.TOOLS.BonfireScale = parseFloat(GameEditor.Parameters['Bonfire Scale'] || 1.3);
GameEditor.TOOLS.BonfireAlpha = parseFloat(GameEditor.Parameters['Bonfire Alpha'] || 1.0);
GameEditor.TOOLS.BonfirePulseMin = parseFloat(GameEditor.Parameters['Bonfire pulseMin'] || 1.1);
GameEditor.TOOLS.BonfirePulseMax = parseFloat(GameEditor.Parameters['Bonfire pulseMax'] || 1.3);
GameEditor.TOOLS.BonfirePulseSpeed = parseInt(GameEditor.Parameters['Bonfire pulseSpeed'] || 15);
GameEditor.TOOLS.BonfireFlickIntensity = parseInt(GameEditor.Parameters['Bonfire flickIntensity'] || 1);
GameEditor.TOOLS.BonfireFlickSpeed = parseInt(GameEditor.Parameters['Bonfire flickSpeed'] || 3);
GameEditor.TOOLS.TorchFilename = String(GameEditor.Parameters['Torch Filename'] || 'default');
GameEditor.TOOLS.TorchColor = Number(GameEditor.Parameters['Torch Color'] || 15);
GameEditor.TOOLS.TorchScale = parseFloat(GameEditor.Parameters['Torch Scale'] || 1.0);
GameEditor.TOOLS.TorchAlpha = parseFloat(GameEditor.Parameters['Torch Alpha'] || 1.0);
GameEditor.TOOLS.TorchPulseMin = parseFloat(GameEditor.Parameters['Torch pulseMin'] || 0.98);
GameEditor.TOOLS.TorchPulseMax = parseFloat(GameEditor.Parameters['Torch pulseMax'] || 1.02);
GameEditor.TOOLS.TorchPulseSpeed = parseInt(GameEditor.Parameters['Torch pulseSpeed'] || 7);
GameEditor.TOOLS.TorchFlickIntensity = parseInt(GameEditor.Parameters['Torch flickIntensity'] || 1);
GameEditor.TOOLS.TorchFlickSpeed = parseInt(GameEditor.Parameters['Torch flickSpeed'] || 3);
GameEditor.TOOLS.AmbientFilename = String(GameEditor.Parameters['Ambient Filename'] || 'default');
GameEditor.TOOLS.AmbientColor = Number(GameEditor.Parameters['Ambient Color'] || 28);
GameEditor.TOOLS.AmbientScale = parseFloat(GameEditor.Parameters['Ambient Scale'] || 5.0);
GameEditor.TOOLS.AmbientAlpha = parseFloat(GameEditor.Parameters['Ambient Alpha'] || 0.5);

//-----------------------------------------------------------------------------
// Lighting Controller
//
//

/**
 * The class that controls all Lights.
 *
 * @class LightingController
 * @constructor
 */
function LightingController() {
    this.initialize.apply(this, arguments);
}

/**
 * Create an instance of LightingController
 */
LightingController.prototype.initialize = function() {
    this.clear();
    this.lightData = new Light_Data()
};

/**
 * Initializes all attributes to their default values
 */
LightingController.prototype.clear = function() {
    this.list = [];
    this.refresh = false;
    this.playerTorch = null;
    this.addingLights = false;
    this.addingLightsList = [];
    this.removingLights = false;
    this.removingLightsList = [];
    this.eventList = {};
};

/**
 * Creates a light source of the specified type.
 *
 * @param light The type of the light to create.
 * @param x X position.
 * @param y Y position.
 */
LightingController.prototype.addByType = function(light, x, y) {
    if (!x) x = $gamePlayer.x * $gameMap.tileWidth();
    if (!y) y = $gamePlayer.y * $gameMap.tileHeight();
    var lightSource = new window[light](x, y);
    this.add(lightSource);
    this.save();
};

/**
 * Turns on or off the Player Torch depending on the switch defined in the Plugin Parameters.
 */
LightingController.prototype.checkPlayerTorch = function() {
    if ($gameSwitches.value(GameEditor.TOOLS.PlayerTorchSwitch) === true) {
        if (!this.playerTorch) {
            var playerTorch = new PlayerTorch();
            this.addingLightsList.push(playerTorch);
            this.addingLights = true;
            this.playerTorch = playerTorch;
        }
    } else {
        if (this.playerTorch) {
            this.removingLightsList.push(this.playerTorch);
            this.removingLights = true;
            this.playerTorch = null;
        }
    }
};

/**
 * Adds a light source.
 *
 * @param lightSource The source to add.
 */
LightingController.prototype.add = function(lightSource) {
    this.addingLightsList.push(lightSource);
    this.addingLights = true;
    this.list.push(lightSource);
};

/**
 * Removes a light source.
 *
 * @param lightSource The source to remove.
 */
LightingController.prototype.remove = function(lightSource) {
    this.removingLightsList.push(lightSource);
    this.removingLights = true;
    var index = this.list.indexOf(lightSource);
    this.list.splice(index, 1);
    this.save();
};

/**
 * Saves all the lights into the map's data.
 */
LightingController.prototype.save = function() {
    $gameMap.saveLightingData();
};

/**
 * Gets the light with the specified id
 *
 * @param id The id of the light. Start with "e" if it is a light from an event
 * @return LightSource | LightSourceEvent
 */
LightingController.prototype.getLightById = function(id) {
    if (id.toLowerCase().startsWith("e")) {
        id = id.substring(1);
        return this.eventList[Number(id)];
    }

    return this.list[Number(id)];
};

//-----------------------------------------------------------------------------
// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.

/**
 * Loads the bitmap of the specified light.
 *
 * @param filename The file that will be loaded for the light.
 * @param hue The hue that'll be set for the colour of the light.
 */
ImageManager.loadLight = function(filename, hue) {
    return this.loadBitmap('img/lights/', filename, hue, true);
};

//-----------------------------------------------------------------------------
// Light_Data
//
// Stores the game data for all lights
function Light_Data() {
    this.initialize.apply(this, arguments)
}

Light_Data.prototype.initialize = function(data) {
    this.data = (typeof data !== "undefined") ? data : {};
};

Light_Data.prototype.getData = function(lightId, dataName, defaultValue) {
    if (!(lightId in this.data) || !(dataName in this.data[lightId])) return defaultValue;

    return this.data[lightId][dataName];
};

Light_Data.prototype.setData = function(lightId, dataName, value) {
    if (!(lightId in this.data)) this.data[lightId] = {};
    this.data[lightId][dataName] = value;
};

Light_Data.prototype.removeData = function(lightId, dataName) {
    if (!(lightId in this.data)) this.data[lightId] = {};
    delete this.data[lightId][dataName];
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//
// The set of sprites on the map screen.

if (GameEditor.TOOLS.IncompatibilityFix !== "true") { // no incompatibility fix

Spriteset_Map.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createParallax();
    this.createTilemap();
    this.createCharacters();
    this.createShadow();
    this.createDestination();
    this.createLighting();
    this.createWeather();
};

Spriteset_Map.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateTileset();
    this.updateParallax();
    this.updateTilemap();
    this.updateShadow();
    this.updateLighting();
    this.updateWeather();
}

} else {
FLZ_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    FLZ_Spriteset_Map_createLowerLayer.call(this);
    this.createLighting();
};

FLZ_Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    FLZ_Spriteset_Map_update.call(this);
    this.updateLighting();
}
}

Spriteset_Map.prototype.createLighting = function() {
    $gameLighting.clear();
    this._lightingTexture = PIXI.RenderTexture.create(Graphics.width, Graphics.height);
    this._lightingSurface = new LightingSurface();
    this._lightingSprite = new PIXI.Sprite();
    this._lightingSprite.texture = this._lightingTexture;
    this._lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    this._lightingSprite.alpha = 1.0;
    $gameTime.updateAllLightLimits();
    this.addChild(this._lightingSprite);
};

Spriteset_Map.prototype.updateLighting = function() {
    this._lightingSurface.update();
    Graphics._renderer.render(this._lightingSurface, this._lightingTexture, false);
};

//-----------------------------------------------------------------------------
// LightingSurface
//
//

function LightingSurface() {
    this.initialize.apply(this, arguments);
}

LightingSurface.prototype = Object.create(PIXI.Container.prototype);
LightingSurface.prototype.constructor = LightingSurface;

LightingSurface.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._width = Graphics.width; 
    this._height = Graphics.height;
    this._createSurface();
    this._createLights();
};

LightingSurface.prototype._createSurface = function() {
    this._surface = new Sprite();
    this._surface.bitmap = new Bitmap(this._width, this._height);
    var color = GameEditor.rgbToHex($gameTime.tint(0), $gameTime.tint(1), $gameTime.tint(2));
    this._lastColor = color;
    this._surface.bitmap.fillRect(0, 0, this._width, this._height, color);
    this.addChild(this._surface);
};

LightingSurface.prototype._createLights = function() {
    // From events
    var events = $gameMap._events;
    for (var i = 0; i < events.length; i++) {
        if (events[i]) {
            this.addLightSourceToEvent(events[i].event().note, events[i].x,
                events[i].y, events[i].eventId());
        }
    }
    // From editor
    this.createEditorLights($gameMap.getLightingData(this));
    
    $gameLighting.checkPlayerTorch();
};

LightingSurface.prototype.createEditorLights = function(lightSourcesData) {
    if (lightSourcesData) {
        for (var i = 0; i < lightSourcesData.length; i++) {
            var lightSourceData = lightSourcesData[i];
            var lightSource = new LightSource(lightSourceData.filename,
                lightSourceData.x, lightSourceData.y, lightSourceData.hue,
                lightSourceData.scale, lightSourceData.alpha, $gameLighting.list.length);
            if (lightSourceData.pulseAnimation === true) {
                lightSource.setupPulseAnimation(lightSourceData.pulseMin,
                    lightSourceData.pulseMax, lightSourceData.pulseSpeed);
            }
            if (lightSourceData.flickerAnimation === true) {
                lightSource.setupFlickerAnimation(lightSourceData.flickIntensity,
                    lightSourceData.flickSpeed);
            }
            this.addChild(lightSource);
            $gameLighting.list.push(lightSource);
        }
    }
};

LightingSurface.prototype.addLightSourceToEvent = function(type, x, y, eventId) {
    if (!type) return;
    var lightSource;
    switch (type) {
        case "Bonfire":
            lightSource = new BonfireLightEvent(x, y, eventId);
            break;
        case "Torch":
            lightSource = new TorchLightEvent(x, y, eventId);
            break;
        case "Ambient":
            lightSource = new AmbientLightEvent(x, y, eventId);
            break;
        default:
            var customType = type.slice(0, 5);
            if (customType !== "Light") return;
            var lightConfig = type.split(').');
            if (lightConfig[0]) {
                // Creates custom light
                var params = lightConfig[0];
                var temp = params.replace('Light(', '');
                params = temp.split(',');
                // Clean parameters
                var filename = String(params[0]);
                var scale = new PIXI.Point(parseFloat(params[1]), parseFloat(params[1]));
                var hue = parseInt(params[2]);
                var alpha = parseFloat(params[3]);
                lightSource = new LightSourceEvent(filename, x, y, hue, scale, alpha, eventId);
            }
            // Setup animations
            for (var i = 1; i < lightConfig.length; i++) {
                if (!lightConfig[i]) return;
                var params = lightConfig[i];
                var animationToSetup = params.slice(0, 8);
                if (animationToSetup === "addPulse") {
                    lightSource = this.setupPulseAnimationToEvent(lightSource, params)
                } else if (animationToSetup === "addFlick") {
                    lightSource = this.setupFlickAnimationToEvent(lightSource, params)
                }
            }
            break;
    }
    this.addChild(lightSource);
    $gameLighting.eventList[eventId] = lightSource;
};

LightingSurface.prototype.setupPulseAnimationToEvent = function(lightSource, params) {
    var temp = params.replace('addPulse(', '');
    params = temp.split(',');
    var pulseMin = parseFloat(params[0]);
    var pulseMax = parseFloat(params[1]);
    var pulseSpeed = parseInt(params[2]);
    lightSource.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    return lightSource;
};

LightingSurface.prototype.setupFlickAnimationToEvent = function(lightSource, params) {
    var temp = params.replace('addFlick(', '');
    params = temp.split(',');
    var flickIntensity = parseInt(params[0]);
    var flickSpeed = parseInt(params[1]);
    lightSource.setupFlickerAnimation(flickIntensity, flickSpeed);
    return lightSource;
};

LightingSurface.prototype.update = function() {    
    var color = GameEditor.rgbToHex($gameTime.tint(0), $gameTime.tint(1), $gameTime.tint(2));
    if (this._lastColor !== color) {
        this._surface.bitmap.fillRect(0, 0, this._width, this._height, color);
        this._lastColor = color;
    }
    this._updateLights();
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

LightingSurface.prototype._updateLights = function() {
    if ($gameLighting.addingLights === true) {
        var list = $gameLighting.addingLightsList;
        for (var i = 0; i < list.length; i++) {
            this.addChild(list[i]);
            $gameLighting.addingLightsList.splice(i, 1);
        }
        $gameLighting.addingLights = false;
        $gameLighting.refresh = true;
    }
    if ($gameLighting.removingLights === true) {
        var list = $gameLighting.removingLightsList;
        for (var i = 0; i < list.length; i++) {
            this.removeChild(list[i]);
            $gameLighting.removingLightsList.splice(i, 1);
        }
        $gameLighting.removingLights = false;
        $gameLighting.refresh = true;
    }
};

//-----------------------------------------------------------------------------
// LightSource
//
//

function LightSource() {
    this.initialize.apply(this, arguments);
}

LightSource.prototype = Object.create(Sprite.prototype);
LightSource.prototype.constructor = LightSource;

LightSource.prototype.initialize = function(filename, x, y, hue, scale, alpha, index) {
    Sprite.prototype.initialize.call(this);
    this.id = index;
    this._off = !this.getTempData("powered", true);
    this.bitmap = ImageManager.loadLight(filename);
    this.filename = filename;
    this.ox = x;
    this.oy = y;
    this.modifyColor(hue);
    this.modifySize(scale);
    this.modifyOpacity(alpha);
    this.blendMode = PIXI.BLEND_MODES.ADD;
    this.anchor = new PIXI.Point(0.5, 0.5);
    this.mode = 0; // 0 = Static, 1 = Animated
    this.eventId = null;
    this.pulseAnimation = false;
    this.pulseMin = 0;
    this.pulseMax = 0;
    this.pulseSpeed = 0;
    this.flickerAnimation = false;
    this.flickIntensity = 0;
    this.flickSpeed = 0;
    
    // Temporary elements
    this._hasTemporaryHue = false;
    var tempHue = this.getTempData("hue", undefined);
    if (typeof tempHue !== "undefined") this.setTemporaryColor(tempHue);
};

LightSource.prototype.getId = function() {
    if (typeof this.id === "undefined") this.id = $gameLighting.list.indexOf(this);
    return this.id;
};

LightSource.prototype.addTempData = function(dataName, value) {
    $gameLighting.lightData.setData(this.getId(), dataName, value);
};

LightSource.prototype.getTempData = function(dataName, defaultValue) {
    return $gameLighting.lightData.getData(this.getId(), dataName, defaultValue);
};

LightSource.prototype.removeTempData = function(dataName) {
    $gameLighting.lightData.removeData(this.getId(), dataName);
};

LightSource.prototype.turnOff = function() {
    this._off = true;
    this.addTempData("powered", !this._off);
};

LightSource.prototype.turnOn = function() {
    this._off = false;
    this.addTempData("powered", !this._off);
};

LightSource.prototype.setupPulseAnimation = function(pulseMin, pulseMax, pulseSpeed) {
    this.pulseMin = pulseMin || 0.9;
    this.pulseMax = pulseMax || 1.2;
    this.pulseSpeed = pulseSpeed || 1;
    this.mode = 1;
    this.pulseAnimation = true;
    this.scale = new PIXI.Point(this.oscale.x, this.oscale.y);
    this._pulseSpeed = this.pulseSpeed / 800;
    this._pulseAnimationExpand = true;
};

LightSource.prototype.setupFlickerAnimation = function(flickIntensity, flickSpeed) {
    this.flickIntensity = flickIntensity || 1;
    this.flickSpeed = flickSpeed || 1;
    this.mode = 1;
    this.flickerAnimation = true;
    this._flickSpeed = 20 * this.flickSpeed;
    this._flickIntensity = this.alpha / (1.1 * this.flickIntensity);
    this._flickMax = 1000;
    this._flickCounter = this.flickMax;
};

LightSource.prototype.refreshPulseAnimation = function() {
    this.scale = new PIXI.Point(this.oscale.x, this.oscale.y);
    this._pulseSpeed = this.pulseSpeed / 800;
};

LightSource.prototype.refreshFlickerAnimation = function() {
    this._flickSpeed = 20 * this.flickSpeed;
    this._flickIntensity = this.alpha / (1.1 * this.flickIntensity);
    this._flickMax = 1000;
    this._flickCounter = this.flickMax;
};

LightSource.prototype.update = function() {
    this._updatePosition();
    this._updateVisibility();
    this._updateAnimation();
};

LightSource.prototype.modifyFilename = function(filename) {
    if (filename) {
        this.bitmap = ImageManager.loadLight(filename);
    }
};

LightSource.prototype.modifySize = function(scale) {
    var newScale = scale || new PIXI.Point(1.0, 1.0);
    this.oscale = new PIXI.Point(newScale.x, newScale.y);
    this.scale = new PIXI.Point(newScale.x, newScale.y);
    if (this.pulseAnimation === true) {
        this.pulseMax = this.scale.x;
    }
};

LightSource.prototype.modifyOpacity = function(alpha) {
    var newAlpha = alpha || 1;
    this.oalpha = this.alpha = newAlpha;
};

LightSource.prototype.modifyColor = function(hue) {
    if (hue >= 0 && hue <= 359) {
        this.hue = hue;
        if (!this._hasTemporaryHue) {
            this.tint = Number(GameEditor.getColor(hue) || 0xFFFFFF);
        }
    }
};

LightSource.prototype.setTemporaryColor = function(hue) {
    this._hasTemporaryHue = true;
    this.addTempData("hue", hue);
    this.tint = Number(GameEditor.getColor(hue) || 0xFFFFFF);
};

LightSource.prototype.removeTemporaryColor = function() {
    this._hasTemporaryHue = false;
    this.removeTempData("hue");
    this.modifyColor(this.hue);
};

LightSource.prototype._updatePosition = function() {
    this.x = this.ox - ($gameMap.displayX() * $gameMap.tileWidth());
    this.y = this.oy - ($gameMap.displayY() * $gameMap.tileHeight());
};

LightSource.prototype._updateVisibility = function() {
    if (this._off) {
        this.visible = false;
        return;
    }
    
    var x = this.x - (this.width / 2) * this.scale.x;
    var y = this.y - (this.height / 2) * this.scale.y;
    this.visible = !(x > Graphics.width || y > Graphics.height);
};

LightSource.prototype._updateAnimation = function() {
    if (!this.visible) return; // Not visible.
    if (this.mode === 0) return; // Not animated.
    // Pulse
    if (this.pulseAnimation === true) {
        if (this._pulseAnimationExpand === true) {
            if (this.scale.x < this.pulseMax) {
                this.scale.x += this._pulseSpeed;
                this.scale.y += this._pulseSpeed;
            } else {
                this._pulseAnimationExpand = false;
            }
        } else {
            if (this.scale.x > this.pulseMin) {
                this.scale.x -= this._pulseSpeed;
                this.scale.y -= this._pulseSpeed;
            } else {
                this._pulseAnimationExpand = true;
            }
        }
    }
    // Flicker
    if (this.flickerAnimation === true) {
        if (this._flickCounter > 0) {
            this._flickCounter -= this._flickSpeed;
            this.alpha = this.oalpha;
        } else {
            this._flickCounter = this._flickMax;
            this.alpha = this._flickIntensity;
        }
    }
};

LightSource.prototype.getData = function() {
    return {
        filename: this.filename,
        x: this.ox,
        y: this.oy,
        hue: this.hue,
        scale: this.oscale,
        alpha: this.oalpha,
        pulseAnimation: this.pulseAnimation,
        pulseMin: this.pulseMin,
        pulseMax: this.pulseMax,
        pulseSpeed: this.pulseSpeed,
        flickerAnimation: this.flickerAnimation,
        flickIntensity: this.flickIntensity,
        flickSpeed: this.flickSpeed
    };
};

LightSource.prototype.setData = function(data) {
    this.filename = data['filename'];
    this.ox = data['x'];
    this.oy = data['y'];
    this.hue = data['hue'];
    this.oscale = data['scale'];
    this.oalpha = data['alpha'];
    
    if (data['pulseAnimation']) {
        this.setupPulseAnimation(data['pulseMin'], data['pulseMax'], data['pulseSpeed']);
    }
    
    if (data['flickerAnimation']) {
        this.setupFlickerAnimation(data['flickIntensity'], data['flickSpeed']);
    }
};

//-----------------------------------------------------------------------------
// LightSourceEvent
//
//

function LightSourceEvent() {
    this.initialize.apply(this, arguments);
}

LightSourceEvent.prototype = Object.create(LightSource.prototype);
LightSourceEvent.prototype.constructor = LightSourceEvent;

LightSourceEvent.prototype.initialize = function(filename, x, y, hue, scale, alpha, eventId) {
    LightSource.prototype.initialize.call(this, filename, x, y, hue, scale, alpha, "e" + String(this.eventId));
    this.eventId = eventId;
    this.ox = this.getOriginX(x);
    this.oy = this.getOriginY(y);
    this.offsetX = 0;
    this.offsetY = 3;
};

LightSourceEvent.prototype.getOriginX = function(x) {
    return x * $gameMap.tileWidth() + ($gameMap.tileWidth() / 2);
};

LightSourceEvent.prototype.getOriginY = function(y) {
    return y * $gameMap.tileHeight() + ($gameMap.tileHeight() / 2);
};

LightSourceEvent.prototype._updatePosition = function() {
    var eventLinkedTo = $gameMap.event(this.eventId);
    this.x = this.offsetX + this.getOriginX(eventLinkedTo._realX) - ($gameMap.displayX() * $gameMap.tileWidth());
    this.y = this.offsetY + this.getOriginY(eventLinkedTo._realY) - ($gameMap.displayY() * $gameMap.tileHeight());
};

//-----------------------------------------------------------------------------
// AmbientLightEvent
//
//

function AmbientLightEvent() {
    this.initialize.apply(this, arguments);
}

AmbientLightEvent.prototype = Object.create(LightSourceEvent.prototype);
AmbientLightEvent.prototype.constructor = AmbientLightEvent;

AmbientLightEvent.prototype.initialize = function(x, y, eventId) {
    var filename = GameEditor.TOOLS.AmbientFilename;
    var hue = GameEditor.TOOLS.AmbientColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.AmbientScale,
        GameEditor.TOOLS.AmbientScale);
    var alpha = GameEditor.TOOLS.AmbientAlpha;
    LightSourceEvent.prototype.initialize.call(this, filename, x, y, hue, scale,
        alpha, eventId);
};

//-----------------------------------------------------------------------------
// TorchLightEvent
//
//

function TorchLightEvent() {
    this.initialize.apply(this, arguments);
}

TorchLightEvent.prototype = Object.create(LightSourceEvent.prototype);
TorchLightEvent.prototype.constructor = TorchLightEvent;

TorchLightEvent.prototype.initialize = function(x, y, eventId) {
    var filename = GameEditor.TOOLS.TorchFilename;
    var hue = GameEditor.TOOLS.TorchColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.TorchScale,
        GameEditor.TOOLS.TorchScale);
    var alpha = GameEditor.TOOLS.TorchAlpha;
    var pulseMin = GameEditor.TOOLS.TorchPulseMin;
    var pulseMax = GameEditor.TOOLS.TorchPulseMax;
    var pulseSpeed = GameEditor.TOOLS.TorchPulseSpeed;
    var flickIntensity = GameEditor.TOOLS.TorchFlickIntensity;
    var flickSpeed = GameEditor.TOOLS.TorchFlickSpeed;
    LightSourceEvent.prototype.initialize.call(this, filename, x, y, hue, scale,
        alpha, eventId);
    this.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    this.setupFlickerAnimation(flickIntensity, flickSpeed);
};

//-----------------------------------------------------------------------------
// BonfireLightEvent
//
//

function BonfireLightEvent() {
    this.initialize.apply(this, arguments);
}

BonfireLightEvent.prototype = Object.create(LightSourceEvent.prototype);
BonfireLightEvent.prototype.constructor = BonfireLightEvent;

BonfireLightEvent.prototype.initialize = function(x, y, eventId) {
    var filename = GameEditor.TOOLS.BonfireFilename;
    var hue = GameEditor.TOOLS.BonfireColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.BonfireScale,
        GameEditor.TOOLS.BonfireScale);
    var alpha = GameEditor.TOOLS.BonfireAlpha;
    var pulseMin = GameEditor.TOOLS.BonfirePulseMin;
    var pulseMax = GameEditor.TOOLS.BonfirePulseMax;
    var pulseSpeed = GameEditor.TOOLS.BonfirePulseSpeed;
    var flickIntensity = GameEditor.TOOLS.BonfireFlickIntensity;
    var flickSpeed = GameEditor.TOOLS.BonfireFlickSpeed;
    LightSourceEvent.prototype.initialize.call(this, filename, x, y, hue, scale,
        alpha, eventId);
    this.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    this.setupFlickerAnimation(flickIntensity, flickSpeed);
};

//-----------------------------------------------------------------------------
// BonfireLight
//
//

function BonfireLight() {
    this.initialize.apply(this, arguments);
}

BonfireLight.prototype = Object.create(LightSource.prototype);
BonfireLight.prototype.constructor = BonfireLight;

BonfireLight.prototype.initialize = function(x, y) {
    var filename = GameEditor.TOOLS.BonfireFilename;
    var hue = GameEditor.TOOLS.BonfireColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.BonfireScale,
        GameEditor.TOOLS.BonfireScale);
    var alpha = GameEditor.TOOLS.BonfireAlpha;
    var pulseMin = GameEditor.TOOLS.BonfirePulseMin;
    var pulseMax = GameEditor.TOOLS.BonfirePulseMax;
    var pulseSpeed = GameEditor.TOOLS.BonfirePulseSpeed;
    var flickIntensity = GameEditor.TOOLS.BonfireFlickIntensity;
    var flickSpeed = GameEditor.TOOLS.BonfireFlickSpeed;
    LightSource.prototype.initialize.call(this, filename, x, y, hue, scale, alpha);
    this.ox = x;
    this.oy = y;
    this.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    this.setupFlickerAnimation(flickIntensity, flickSpeed);
};

//-----------------------------------------------------------------------------
// TorchLight
//
//

function TorchLight() {
    this.initialize.apply(this, arguments);
}

TorchLight.prototype = Object.create(LightSource.prototype);
TorchLight.prototype.constructor = TorchLight;

TorchLight.prototype.initialize = function(x, y) {
    var filename = GameEditor.TOOLS.TorchFilename;
    var hue = GameEditor.TOOLS.TorchColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.TorchScale,
        GameEditor.TOOLS.TorchScale);
    var alpha = GameEditor.TOOLS.TorchAlpha;
    var pulseMin = GameEditor.TOOLS.TorchPulseMin;
    var pulseMax = GameEditor.TOOLS.TorchPulseMax;
    var pulseSpeed = GameEditor.TOOLS.TorchPulseSpeed;
    var flickIntensity = GameEditor.TOOLS.TorchFlickIntensity;
    var flickSpeed = GameEditor.TOOLS.TorchFlickSpeed;
    LightSource.prototype.initialize.call(this, filename, x, y, hue, scale, alpha);
    this.ox = x;
    this.oy = y;
    this.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    this.setupFlickerAnimation(flickIntensity, flickSpeed);
};

//-----------------------------------------------------------------------------
// AmbientLight
//
//

function AmbientLight() {
    this.initialize.apply(this, arguments);
}

AmbientLight.prototype = Object.create(LightSource.prototype);
AmbientLight.prototype.constructor = AmbientLight;

AmbientLight.prototype.initialize = function(x, y) {
    var filename = GameEditor.TOOLS.AmbientFilename;
    var hue = GameEditor.TOOLS.TorchColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.AmbientScale,
        GameEditor.TOOLS.AmbientScale);
    var alpha = GameEditor.TOOLS.AmbientAlpha;
    LightSource.prototype.initialize.call(this, filename, x, y, hue, scale, alpha);
    this.ox = x;
    this.oy = y;
};

//-----------------------------------------------------------------------------
// PlayerTorch
//
//

function PlayerTorch() {
    this.initialize.apply(this, arguments);
}

PlayerTorch.prototype = Object.create(LightSource.prototype);
PlayerTorch.prototype.constructor = PlayerTorch;

PlayerTorch.prototype.initialize = function() {
    var direction = $gamePlayer.direction();
    var filename = (GameEditor.TOOLS.PlayerTorchFourDirections === 'true') ? GameEditor.TOOLS.PlayerTorchFilename + "_" + String(direction) : GameEditor.TOOLS.PlayerTorchFilename;
    var hue = GameEditor.TOOLS.PlayerTorchColor;
    var scale = new PIXI.Point(GameEditor.TOOLS.PlayerTorchScale,
        GameEditor.TOOLS.PlayerTorchScale);
    var alpha = GameEditor.TOOLS.PlayerTorchAlpha;
    var offsetX = GameEditor.TOOLS.PlayerTorchOffsetX;
    var offsetY = GameEditor.TOOLS.PlayerTorchOffsetY;
    var pulseMin = GameEditor.TOOLS.PlayerTorchPulseMin;
    var pulseMax = GameEditor.TOOLS.PlayerTorchPulseMax;
    var pulseSpeed = GameEditor.TOOLS.PlayerTorchPulseSpeed;
    var flickIntensity = GameEditor.TOOLS.PlayerTorchFlickIntensity;
    var flickSpeed = GameEditor.TOOLS.PlayerTorchFlickSpeed;
    LightSource.prototype.initialize.call(this, filename, 0, 0, hue, scale, alpha);
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    this.setupFlickerAnimation(flickIntensity, flickSpeed);
};

PlayerTorch.prototype._updatePosition = function() {
    this.x = this.offsetX + $gamePlayer.screenX();
    this.y = this.offsetY + $gamePlayer.screenY();
    if (this.direction !== $gamePlayer.direction() && GameEditor.TOOLS.PlayerTorchFourDirections === 'true') {
        this.direction = $gamePlayer.direction();
        this.modifyFilename(GameEditor.TOOLS.PlayerTorchFilename + "_" + String(this.direction));
    }
};

//-----------------------------------------------------------------------------
// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.

var LNM_LightingTool_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    LNM_LightingTool_Game_Map_initialize.call(this);
    this._lightingMapData = null;
};

var LNM_LightingTool_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    LNM_LightingTool_Game_Map_setup.call(this, mapId);
    this._lightingMapData = new Lighting_Map(mapId);
};

Game_Map.prototype.getLightingData = function(instance) {
    return this._lightingMapData.load(instance);
};

Game_Map.prototype.saveLightingData = function() {
    this._lightingMapData.save();
};

var LNM_LightingTool_Game_Map_refresh = Game_Map.prototype.refresh;
Game_Map.prototype.refresh = function() {
    LNM_LightingTool_Game_Map_refresh.call(this);
    $gameLighting.checkPlayerTorch();
};

//-----------------------------------------------------------------------------
// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.

var LNM_LightingTool_Game_Map_eraseEvent = Game_Map.prototype.eraseEvent;
Game_Map.prototype.eraseEvent = function(eventId) {
    LNM_LightingTool_Game_Map_eraseEvent.call(this, eventId);
    $gameLighting.removingLightsList.push($gameLighting.eventList[eventId]);
    $gameLighting.removingLights = true;
};

//-----------------------------------------------------------------------------
// Lighting_Map
//

function Lighting_Map() {
    this.initialize.apply(this, arguments);
}

Lighting_Map.prototype.initialize = function(mapId) {
    this._mapId = mapId;
    var path = StorageManager.localContentPath() + 'data/';
    var file = 'Map%1lighting.json'.format(mapId.padZero(3));
    this._file = path + file;
};

Lighting_Map.prototype.load = function(instance) {
    try {
        var fs = require('fs');
        if (fs.existsSync(this._file)) {
            var file = fs.readFileSync(this._file, 'utf8');
            return JSON.parse(LZString.decompressFromBase64(file));
        } else {
            this.save();
            return false;
        }
    } catch (e) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "file:///" + this._file);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            var data = JSON.parse(LZString.decompressFromBase64(xhr.responseText));
            
            LightingSurface.prototype.createEditorLights.call(instance, data);
        };
        xhr.send();
        return false;
    }
};

Lighting_Map.prototype.save = function() {
    var fs = require('fs');
    var data = this._generateData();
    var file = JSON.stringify(data);
    fs.writeFile(this._file, LZString.compressToBase64(file));
};

Lighting_Map.prototype._generateData = function() {
    var data = [];
    for (var i = 0; i < $gameLighting.list.length; i++) {
        if ($gameLighting.list[i].eventId == null) {
            var lightSourceData = $gameLighting.list[i].getData();
            data.push(lightSourceData);
        }
    }
    return data;
};

//=============================================================================
// Editor
//=============================================================================

var LNM_LightingTool_GameEditor_initialize = Game_Editor.prototype.initialize;
Game_Editor.prototype.initialize = function() {
    PIXI.Container.call(this);
    LNM_LightingTool_GameEditor_initialize.call(this);
    this._setupLightingEditor();
    this._clipboardData = {};
};

Game_Editor.prototype._setupLightingEditor = function() {
    this.addButton('Lights', function() {
        $gameEditor.toggleLightingEditor();
    });
    this._lightingToolButtons = [];
    var newButton = function(i) {
        var spacing = 32;
        var y = spacing * i;
        return new ButtonText(20, 20 + y, $lights[i], function() {
            $gameLighting.addByType($lights[i] + 'Light');
        });
    };
    for (var i = 0; i < $lights.length; i++) {
        var button = newButton(i);
        button.visible = false;
        this.addChild(button);
        this._lightingToolButtons.push(button);
    }
    this.lightingTool = new Lighting_Tool();
    this.addChild(this.lightingTool);
};

Game_Editor.prototype.toggleLightingEditor = function() {
    if (GameEditor.TOOLS.Time === true) this.toggleTimeEditor();
    GameEditor.TOOLS.Lighting = !GameEditor.TOOLS.Lighting;
    for (var i = 0; i < this._lightingToolButtons.length; i++) {
        this._lightingToolButtons[i].visible = !this._lightingToolButtons[i].visible;
    }
    if (!GameEditor.TOOLS.Lighting) this.lightingTool.hide();
};

Game_Editor.prototype.addLightToClipboard = function(data) {
    this._clipboardData = data;
};

Game_Editor.prototype.getLightFromClipboard = function() {
    var source = new LightSource(this._clipboardData.filename, this._clipboardData.x, this._clipboardData.y,
        this._clipboardData.hue, this._clipboardData.scale, this._clipboardData.alpha);
    source.setData(this._clipboardData);
    return source;
};

Game_Editor.prototype.hasClipboard = function() {
    return this._clipboardData !== {};
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//
// The set of sprites on the map screen.

Spriteset_Map.prototype.createUpperLayer = function() {
    Spriteset_Base.prototype.createUpperLayer.call(this);
    this.createLightingToolLayer();
};

Spriteset_Map.prototype.createLightingToolLayer = function() {
    this._lightIconsSurface = new LightIconsSurface();
    this.addChild(this._lightIconsSurface);
};

//-----------------------------------------------------------------------------
// Lighting_Tool
//
//

function Lighting_Tool() {
    this.initialize.apply(this, arguments);
}

Lighting_Tool.prototype = Object.create(PIXI.Container.prototype);
Lighting_Tool.prototype.constructor = Lighting_Tool;

Lighting_Tool.prototype.initialize = function() {
    PIXI.Container.call(this);
    this.lightSource = null;
    this.lightSourceId = 0;
    this._dragging = false;
    this._createButtons();
    this._createLabels();
    this.hide();
};

var FLZ_ButtonText_OnClick = ButtonText.prototype.onClick;
ButtonText.prototype.onClick = function() {
    if ($gameEditor.lightingTool.isDragging()) return;
    FLZ_ButtonText_OnClick.call(this);
};

Lighting_Tool.prototype._createButtons = function() {
    var x = Graphics.width;
    
    this.addChild(new ButtonText(x - 70, 47, ' < ', function() {
        $gameEditor.lightingTool.lightSource.ox -= 1;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 47, ' > ', function() {
        $gameEditor.lightingTool.lightSource.ox += 1;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 74, ' < ', function() {
        $gameEditor.lightingTool.lightSource.oy -= 1;
        $gameLighting.save();
    }));
    this.addChild(new ButtonText(x - 38, 74, ' > ', function() {
        $gameEditor.lightingTool.lightSource.oy += 1;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 101, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.oscale.x;
        var newAttr = parseFloat((current - 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.modifySize(new PIXI.Point(newAttr, newAttr));
        if ($gameEditor.lightingTool.lightSource.pulseAnimation === true) {
            $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        }
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 101, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.oscale.x;
        var newAttr = parseFloat((current + 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.modifySize(new PIXI.Point(newAttr, newAttr));
        if ($gameEditor.lightingTool.lightSource.pulseAnimation === true) {
            $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        }
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 129, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.oalpha;
        var newAttr = parseFloat((current - 0.05).toFixed(2));
        if (newAttr < 0) newAttr = 0;
        $gameEditor.lightingTool.lightSource.oalpha = newAttr;
        $gameEditor.lightingTool.lightSource.alpha = newAttr;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 129, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.oalpha;
        var newAttr = parseFloat((current + 0.05).toFixed(2));
        if (newAttr > 1) newAttr = 1;
        $gameEditor.lightingTool.lightSource.oalpha = newAttr;
        $gameEditor.lightingTool.lightSource.alpha = newAttr;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 169, ' < ', function() {
        $gameEditor.lightingTool.lightSource.pulseAnimation = false;
        $gameEditor.lightingTool.lightSource.pulseMin = 0;
        $gameEditor.lightingTool.lightSource.pulseMax = 0;
        $gameEditor.lightingTool.lightSource.pulseSpeed = 0;
        if ($gameEditor.lightingTool.lightSource.flickerAnimation === false) {
            $gameEditor.lightingTool.lightSource.mode = 0;
        }
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 169, ' > ', function() {
        $gameEditor.lightingTool.lightSource.setupPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 196, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.pulseMin;
        $gameEditor.lightingTool.lightSource.pulseMin = parseFloat((current - 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 196, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.pulseMin;
        $gameEditor.lightingTool.lightSource.pulseMin = parseFloat((current + 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 223, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.pulseMax;
        $gameEditor.lightingTool.lightSource.pulseMax = parseFloat((current - 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 223, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.pulseMax;
        $gameEditor.lightingTool.lightSource.pulseMax = parseFloat((current + 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 250, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.pulseSpeed;
        $gameEditor.lightingTool.lightSource.pulseSpeed = parseFloat((current - 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 250, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.pulseSpeed;
        $gameEditor.lightingTool.lightSource.pulseSpeed = parseFloat((current + 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshPulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 290, ' < ', function() {
        $gameEditor.lightingTool.lightSource.flickerAnimation = false;
        $gameEditor.lightingTool.lightSource.flickIntensity = 0;
        $gameEditor.lightingTool.lightSource.flickSpeed = 0;
        if ($gameEditor.lightingTool.lightSource.pulseAnimation === false) {
            $gameEditor.lightingTool.lightSource.mode = 0;
        }
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 290, ' > ', function() {
        $gameEditor.lightingTool.lightSource.setupFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 317, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.flickIntensity;
        $gameEditor.lightingTool.lightSource.flickIntensity = parseFloat((current - 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 317, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.flickIntensity;
        $gameEditor.lightingTool.lightSource.flickIntensity = parseFloat((current + 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 344, ' < ', function() {
        var current = $gameEditor.lightingTool.lightSource.flickSpeed;
        $gameEditor.lightingTool.lightSource.flickSpeed = parseFloat((current - 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 344, ' > ', function() {
        var current = $gameEditor.lightingTool.lightSource.flickSpeed;
        $gameEditor.lightingTool.lightSource.flickSpeed = parseFloat((current + 0.05).toFixed(2));
        $gameEditor.lightingTool.lightSource.refreshFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 48, 385, 'null', function() {
        $gameEditor.lightingTool.lightSource.hue = null;
        $gameEditor.lightingTool.lightSource.tint = 0xFFFFFF;
        $gameLighting.save();
    }));
    
    var FLZ_ButtonSlider_Drag_Prototype = ButtonSlider.prototype.drag;
    this.sliderHue = new ButtonSlider(x - 288, 454, 280, 0, 359, function(value) {
        if (!$gameEditor.lightingTool.lightSource) return;
        if ($gameEditor.lightingTool.isDragging()) return;
        $gameEditor.lightingTool.lightSource.modifyColor(value);
        $gameLighting.save();
    });
    
    this.sliderHue.drag = function() {
        if ($gameEditor.lightingTool.isDragging()) return;
        FLZ_ButtonSlider_Drag_Prototype.call(this);
    };
    
    
    this.addChild(this.sliderHue);
    this.addChild(new ButtonText(x - 68, 480, 'Delete', function() {
        $gameEditor.lightingTool.deleteLight();
        $gameLighting.save();
    }));
};

Lighting_Tool.prototype._createLabels = function() {
    var x = Graphics.width - 90;
    this.labelTitle = new Label(x, 25, 'LightSourceID 1', 'right', 16, true);
    this.addChild(this.labelTitle);
    this.labelX = new Label(x, 65, 'X: 0', 'right');
    this.addChild(this.labelX);
    this.labelY = new Label(x, 90, 'Y: 0', 'right');
    this.addChild(this.labelY);
    this.labelSize = new Label(x, 115, 'Size: 1.0', 'right');
    this.addChild(this.labelSize);
    this.labelAlpha = new Label(x, 140, 'Alpha: 1.0', 'right');
    this.addChild(this.labelAlpha);
    this.labelPulse = new Label(x, 185, 'Pulse: false', 'right');
    this.addChild(this.labelPulse);
    this.labelPulseMin = new Label(x, 210, 'pulseMin: 0', 'right');
    this.addChild(this.labelPulseMin);
    this.labelPulseMax = new Label(x, 235, 'pulseMax: 0', 'right');
    this.addChild(this.labelPulseMax);
    this.labelPulseSpeed = new Label(x, 260, 'pulseSpeed: 0', 'right');
    this.addChild(this.labelPulseSpeed);
    this.labelFlick = new Label(x, 305, 'Flick: false', 'right');
    this.addChild(this.labelFlick);
    this.labelFlickIntenisty = new Label(x, 330, 'flickIntensity: 0', 'right');
    this.addChild(this.labelFlickIntenisty);
    this.labelFlickSpeed = new Label(x, 355, 'flickSpeed: 0', 'right');
    this.addChild(this.labelFlickSpeed);
    this.labelHue = new Label(x, 400, 'HUE: null', 'right');
    this.addChild(this.labelHue);
};

Lighting_Tool.prototype.setLight = function(lightSource) {
    this.lightSource = lightSource;
    this.lightSourceId = $gameLighting.list.indexOf(lightSource);
    this.show();
};

Lighting_Tool.prototype.deleteLight = function() {
    if (!this.lightSource) return;
    $gameLighting.remove(this.lightSource);
    this.hide();
};

Lighting_Tool.prototype.updateData = function() {
    if (!this.lightSource) return;
    this.labelTitle.setText('LightSourceID: ' + this.lightSourceId);
    this.labelX.setText('X: ' + this.lightSource.ox);
    this.labelY.setText('Y: ' + this.lightSource.oy);
    this.labelSize.setText('Size: ' + this.lightSource.oscale.x);
    this.labelAlpha.setText('Alpha: ' + this.lightSource.oalpha);
    this.labelPulse.setText('Pulse: ' + this.lightSource.pulseAnimation);
    this.labelPulseMin.setText('pulseMin: ' + this.lightSource.pulseMin);
    this.labelPulseMax.setText('pulseMax: ' + this.lightSource.pulseMax);
    this.labelPulseSpeed.setText('pulseSpeed: ' + this.lightSource.pulseSpeed);
    this.labelFlick.setText('Flick: ' + this.lightSource.flickerAnimation);
    this.labelFlickIntenisty.setText('flickIntensity: ' + this.lightSource.flickIntensity);
    this.labelFlickSpeed.setText('flickSpeed: ' + this.lightSource.flickSpeed);
    this.labelHue.setText('HUE: ' + this.lightSource.hue);
    if (this.lightSource.hue != null) this.sliderHue.setValue(this.lightSource.hue);
};

Lighting_Tool.prototype.update = function() {
    this.updateData();
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

Lighting_Tool.prototype.isDragging = function() {
    return this._dragging;
};

Lighting_Tool.prototype.hide = function() {
    this.visible = false;
};

Lighting_Tool.prototype.show = function() {
    this.visible = true;
};

//-----------------------------------------------------------------------------
// LightIconsSurface
//
//

function LightIconsSurface() {
    this.initialize.apply(this, arguments);
}

LightIconsSurface.prototype = Object.create(PIXI.Container.prototype);
LightIconsSurface.prototype.constructor = LightIconsSurface;

LightIconsSurface.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._createIcons();
};

LightIconsSurface.prototype._createIcons = function() {
    for (var i = 0; i < $gameLighting.list.length; i++) {
        var lightSourceIcon = new LightSourceIcon($gameLighting.list[i]);
        this.addChild(lightSourceIcon);
    }
};

LightIconsSurface.prototype.update = function() {
    this.visible = GameEditor.ACTIVE && GameEditor.TOOLS.Lighting;
    if (this.visible) {
        if ($gameLighting.refresh) {
            while (this.children[0]) {
                this.removeChild(this.children[0]);
            }
            for (var i = 0; i < $gameLighting.list.length; i++) {
                var lightSourceIcon = new LightSourceIcon($gameLighting.list[i]);
                this.addChild(lightSourceIcon);
            }
            $gameLighting.refresh = false;
        }
        this.children.forEach(function(child) {
            if (child.update) {
                child.update();
            }
        });
    }
};

LightIconsSurface.prototype.remove = function(lightSource) {
    this.children.forEach(function(child) {
        if (child.lightSource === lightSource) {
            child.visible = false;
        }
    });
};

//-----------------------------------------------------------------------------
// LightSourceIcon
//
//

function LightSourceIcon() {
    this.initialize.apply(this, arguments);
}

LightSourceIcon.prototype = Object.create(Sprite.prototype);
LightSourceIcon.prototype.constructor = LightSourceIcon;

LightSourceIcon.prototype.initialize = function(lightSource) {
    Sprite.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadEditor('LightSource');
    this.lightSource = lightSource;
    this.anchor = new PIXI.Point(0.5, 0.5);
    this._dragging = false;
    this._holdTime = this._holdFrameCount = 6;
};

LightSourceIcon.prototype.update = function() {
    this._updatePosition();
    this._updateMouseBehavior();
};

LightSourceIcon.prototype._updateMouseBehavior = function() {
    if ($gameEditor.lightingTool.isDragging() &&
        $gameEditor.lightingTool.lightSource !== this.lightSource) {
        return;
    }
    if (TouchInput.isTriggered()) {
        if (this.isTriggered()) {
            $gameEditor.lightingTool.setLight(this.lightSource);
        }
    }
    if (TouchInput.isPressed()) {
        this._holdFrameCount--;
        if (this._holdFrameCount <= 0 && this.isTriggered()) {
            this._dragging = true;
            $gameEditor.lightingTool._dragging = true;
            this._holdFrameCount = this._holdTime;
        }
    }
    if (TouchInput.isReleased()) {
        this._holdFrameCount = this._holdTime;
        if (this.isTriggered()) {
            this._dragging = false;
            $gameEditor.lightingTool._dragging = false;
            $gameLighting.save();
        }
    }
    if (this._dragging === true) {
        this.drag();
    }
};

LightSourceIcon.prototype.drag = function() {
    if ($gameEditor.lightingTool.lightSource === this.lightSource) {
        var mx = TouchInput.x;
        var my = TouchInput.y;
        this.lightSource.ox = Math.floor(mx + ($gameMap.displayX() * $gameMap.tileWidth()));
        this.lightSource.oy = Math.floor(my + ($gameMap.displayY() * $gameMap.tileHeight()));
    }
};

LightSourceIcon.prototype.isTriggered = function() {
    var mx = TouchInput.x;
    var my = TouchInput.y;
    var rect = this.getRect();
    return (mx >= rect.x && mx <= rect.x + rect.width &&
        my >= rect.y && my <= rect.y + rect.height);
};

LightSourceIcon.prototype.getRect = function() {
    var x = this.x - (this.width / 2);
    var y = this.y - (this.height / 2);
    var width = this.width;
    var height = this.height;
    return new Rectangle(x, y, width, height);
};

LightSourceIcon.prototype._updatePosition = function() {
    this.x = this.lightSource.x;
    this.y = this.lightSource.y;
};

//-----------------------------------------------------------------------------
// Graphics._onKeyDown
//
// Add useful shortcuts to the editor.

Graphics._copyPaste_onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
    if (event.ctrlKey) {
        if (GameEditor.ACTIVE && SceneManager._scene instanceof Scene_Map) {
            switch (event.keyCode) {
                case 67: // C
                    event.preventDefault();
                    if ($gameEditor.lightingTool.lightSource) {
                        $gameEditor.addLightToClipboard($gameEditor.lightingTool.lightSource.getData());
                    }
                    break;
                case 86: // V
                    event.preventDefault();
                    if ($gameEditor.hasClipboard()) {
                        var pastedSource = $gameEditor.getLightFromClipboard();
                        $gameLighting.add(pastedSource);
                        $gameLighting.save();
                    }
                    break;
            }
        }
    } else if (!event.altKey) {
        if (GameEditor.ACTIVE && SceneManager._scene instanceof Scene_Map) {
            switch (event.keyCode) {
                case 46: case 8: // Delete / Backspace
                    $gameEditor.lightingTool.deleteLight();
                    $gameLighting.save();
                    break;
            }
        }
    }
    return this._copyPaste_onKeyDown(event);
};

//-----------------------------------------------------------------------------
// Light_Limit
//
// Limits the time where the light lightens depending on the time.
function Light_Limit() {
    this.initialize.apply(this, arguments);
}

Light_Limit.prototype = Object.create(Time_Limit.prototype);
Light_Limit.prototype.constructor = Light_Limit;

Light_Limit.prototype.initialize = function(timeBeginIn, timeEndIn, lightIdIn) {
    Time_Limit.prototype.initialize.call(this, timeBeginIn, timeEndIn);
    this.lightId = lightIdIn;
    this._lastValue = -1;
};

Light_Limit.prototype.updateValue = function(value) {
    if (this._lastValue !== value) {
        this._lastValue = value;
        if (value) { $gameLighting.getLightById(this.lightId).turnOn(); }
        else { $gameLighting.getLightById(this.lightId).turnOff(); }
    }
};

//-----------------------------------------------------------------------------
// GameTime
//
//

FLZ_GameTime_Initialize = GameTime.prototype.initialize;
GameTime.prototype.initialize = function() {
    FLZ_GameTime_Initialize.call(this);
    this.lightLimits = [];
};

FLZ_GameTime_Update = GameTime.prototype.update;
GameTime.prototype.update = function() {
    FLZ_GameTime_Update.call(this);
    if (GameEditor.TOOLS.TimeEnabled === 'true' && !this._pause) {
        for (var index in this.lightLimits) {
            this.lightLimits[index].update(this.time);
        }
    }
};

GameTime.prototype.addLightLimit = function(lightLimit) {
    if (!this.lightLimits) { this.lightLimits = []; } // compatibility with old versions
    this.lightLimits.push(lightLimit);
};

GameTime.prototype.updateAllLightLimits = function() {
    if (GameEditor.TOOLS.TimeEnabled === 'true' && !this._pause) {
        for (var index in this.lightLimits) {
            this.lightLimits[index]._lastValue = -1;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

var FLZ_GameTime_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    FLZ_GameTime_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'Light') {
        switch (args[0].toLowerCase()) {
            case 'on':
                $gameLighting.getLightById(args[1]).turnOn();
                break;
            case 'off':
                $gameLighting.getLightById(args[1]).turnOff();
                break;
            case 'limit':
                var timeBegin = String(args[1]).split(':');
                var timeEnd = String(args[2]).split(':');
                $gameTime.addLightLimit(new Light_Limit(timeBegin, timeEnd, args[3]));
                break;
            case 'hue':
                if (args[1].toLowerCase() === "remove" || args[1].toLowerCase() === "reset")
                    $gameLighting.getLightById(args[2]).removeTemporaryColor();
                else {
                    var newHue = Number(args[1]);
                    $gameLighting.getLightById(args[2]).setTemporaryColor(newHue);
                }
                break;
        }
    }
};

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.


var FLZ_LightingTool_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    FLZ_LightingTool_DataManager_createGameObjects.call(this);
    $gameLighting = new LightingController();
};

var FLZ_LightingTool_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = FLZ_LightingTool_DataManager_makeSaveContents.call(this);
    contents.lightData = $gameLighting.lightData;
    return contents;
};

var FLZ_LightingTool_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    FLZ_LightingTool_DataManager_extractSaveContents.call(this, contents);
    if (typeof contents.lightData !== "undefined") $gameLighting.lightData = contents.lightData;
    else $gameLighting.lightData = new Light_Data();
};

var FLZ_LightingTool_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    FLZ_LightingTool_DataManager_setupNewGame.call(this);
    $gameLighting.lightData = new Light_Data();
};