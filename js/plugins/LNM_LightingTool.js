//=============================================================================
// LNM_LightingTool.js
//=============================================================================

GameEditor.TOOLS.Lighting = false;
var $gameLighting = null;
var $lights = ['Ambient', 'Torch', 'Bonfire'];

//=============================================================================
/*:
 * @plugindesc v1.7.4 Tool to add lighting to maps. Requires LNM_GameEditorCore.js
 * @author Sebastián Cámara, continued by FeelZoR
 *
 * @requiredAssets img/editor/Lights
 * @requiredAssets img/editor/LightSource
 * @requiredAssets img/lights/default
 * @requiredAssets img/lights/player_torch_2
 * @requiredAssets img/lights/player_torch_4
 * @requiredAssets img/lights/player_torch_6
 * @requiredAssets img/lights/player_torch_8
 *
 * @param Incompatibility fix
 * @desc true if you are experiencing incompatibilities with another plugin. Put this one at the bottom of the list.
 * @default false
 *
 * @param Random Flick
 * @desc false if you want the flicker animation to happen after a constant amount of time.
 * @default true
 *
 * @param Random Flick Speed Factor
 * @desc The factor defining the probability of flicker animation to happen each time. High numbers may create issues.
 * @default 5
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
 * You can set the default power status to off by simply adding .turnOff() at
 * the end of the line.
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
 * Adding custom lights to enemies
 * For battles, you may want enemies to hold a light. Simply do so by writing
 * in the notes part <Light:yourLight>. Just replace yourLight with the same
 * pattern than for event lights.
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
 * You can also select multiple ids. Specifying “a-b” as an id with a and b
 * being integers will select all lights from a to b, inclusive. To select a
 * range of event lights, just specify “ea-b”, with a and b being integers.
 * Non-existing lights ids will be ignored without any warning.
 * You can specify a list of ids with “[id1, id2, id3]”, and you can use ranges
 * in that list.
 * For example, you can select “1-5” for lights from 1 to 5, “e4-9” for event
 * lights from 4 to 9 and “[1, 4, e6, 9-13, e8-10]” to select lights with id 1,
 * 4, 9 to 13 and event lights with id 6 and 8 to 10.
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
 * Version 1.7.4:
 * * Correct a bug where the lights cannot be loaded in a deployed game.
 *
 * Version 1.7.3:
 * * Correct a bug where the Light limits are global to all the maps.
 *
 * Version 1.7.2:
 * * Correct a bug where temporary status are applied to all lights with same
 * id, no matter what map they are on.
 *
 * Version 1.7.1:
 * * Correct a bug where CTRL + Z crashes the game.
 *
 * Version 1.7.0:
 * + Add the possibility to select multiple lights in Light commands.
 * + Add random flick effect: flick doesn't happen at a specified interval.
 * + Add the possibility to create lights in battle.
 * + Add the possibility to create lights that are turned off by default.
 * * Correct a bug that corrupt save file if a light limit is set on a light
 * and that light is deleted.
 * * Correct a bug that causes all the event lights to have id eundefined.
 * * Correct a bug that causes all the editor lights to have the same id.
 *
 * Version 1.6.0:
 * + Add the possibility to undo (CTRL + Z) and redo (CTRL + Y) actions in
 * editor.
 * + Automatically selects the light when created.
 * + Automatically selects the pasted light for edition.
 * + Allow number entering when clicking on values while editing light
 * properties.
 * + Pulse and Flicker enable setting now loops between true and false, instead
 * of resetting the properties.
 * + Support ⌘ in addition to control for Mac users.
 * * Paste lights next to the player, instead of the position of the copied
 * light.
 * * Correct a bug where pasting without copying anything crashes.
 * * Light dragging no longer start if the mouse didn't move
 *
 * Version 1.5.0:
 * * Correct a bug where required assets weren't taken in account.
 * * Chang the ids of lights so they don't change when another light is
 * deleted.
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
GameEditor.TOOLS.RandomFlick = String(GameEditor.Parameters['Random Flick'] || false);
GameEditor.TOOLS.RandomFlickSpeedFactor = String(GameEditor.Parameters['Random Flick Speed Factor'] || false);
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

GameEditor.TOOLS.Bonfire = {};
GameEditor.TOOLS.Bonfire.filename = String(GameEditor.Parameters['Bonfire Filename'] || 'default');
GameEditor.TOOLS.Bonfire.color = Number(GameEditor.Parameters['Bonfire Color'] || 28);
GameEditor.TOOLS.Bonfire.scale = parseFloat(GameEditor.Parameters['Bonfire Scale'] || 1.3);
GameEditor.TOOLS.Bonfire.alpha = parseFloat(GameEditor.Parameters['Bonfire Alpha'] || 1.0);
GameEditor.TOOLS.Bonfire.pulse = true;
GameEditor.TOOLS.Bonfire.pulseMin = parseFloat(GameEditor.Parameters['Bonfire pulseMin'] || 1.1);
GameEditor.TOOLS.Bonfire.pulseMax = parseFloat(GameEditor.Parameters['Bonfire pulseMax'] || 1.3);
GameEditor.TOOLS.Bonfire.pulseSpeed = parseInt(GameEditor.Parameters['Bonfire pulseSpeed'] || 15);
GameEditor.TOOLS.Bonfire.flick = true;
GameEditor.TOOLS.Bonfire.flickIntensity = parseInt(GameEditor.Parameters['Bonfire flickIntensity'] || 1);
GameEditor.TOOLS.Bonfire.flickSpeed = parseInt(GameEditor.Parameters['Bonfire flickSpeed'] || 3);

GameEditor.TOOLS.Torch = {};
GameEditor.TOOLS.Torch.filename = String(GameEditor.Parameters['Torch Filename'] || 'default');
GameEditor.TOOLS.Torch.color = Number(GameEditor.Parameters['Torch Color'] || 15);
GameEditor.TOOLS.Torch.scale = parseFloat(GameEditor.Parameters['Torch Scale'] || 1.0);
GameEditor.TOOLS.Torch.alpha = parseFloat(GameEditor.Parameters['Torch Alpha'] || 1.0);
GameEditor.TOOLS.Torch.pulse = true;
GameEditor.TOOLS.Torch.pulseMin = parseFloat(GameEditor.Parameters['Torch pulseMin'] || 0.98);
GameEditor.TOOLS.Torch.pulseMax = parseFloat(GameEditor.Parameters['Torch pulseMax'] || 1.02);
GameEditor.TOOLS.Torch.pulseSpeed = parseInt(GameEditor.Parameters['Torch pulseSpeed'] || 7);
GameEditor.TOOLS.Torch.flick = true;
GameEditor.TOOLS.Torch.flickIntensity = parseInt(GameEditor.Parameters['Torch flickIntensity'] || 1);
GameEditor.TOOLS.Torch.flickSpeed = parseInt(GameEditor.Parameters['Torch flickSpeed'] || 3);

GameEditor.TOOLS.Ambient = {};
GameEditor.TOOLS.Ambient.filename = String(GameEditor.Parameters['Ambient Filename'] || 'default');
GameEditor.TOOLS.Ambient.color = Number(GameEditor.Parameters['Ambient Color'] || 28);
GameEditor.TOOLS.Ambient.scale = parseFloat(GameEditor.Parameters['Ambient Scale'] || 5.0);
GameEditor.TOOLS.Ambient.alpha = parseFloat(GameEditor.Parameters['Ambient Alpha'] || 0.5);
GameEditor.TOOLS.Ambient.pulse = false;
GameEditor.TOOLS.Ambient.flick = false;

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
    this.list = {nextId: 0};
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
 *
 * @return {LightSource} The created light
 */
LightingController.prototype.addByType = function(light, x, y) {
    if (!x) x = $gamePlayer.x * $gameMap.tileWidth();
    if (!y) y = $gamePlayer.y * $gameMap.tileHeight();
    var lightSource = LightSource.initializeFromPreset(GameEditor.TOOLS[light], x, y);
    this.add(lightSource);
    this.save();

    return lightSource;
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
LightingController.prototype.add = function(lightSource, id) {
    if (typeof id === "undefined") {
        id = this.list.nextId;
        this.list.nextId++;
    }

    this.addingLightsList.push(lightSource);
    this.addingLights = true;
    this.list[id] = lightSource;
};

/**
 * Removes a light source.
 *
 * @param lightSource The source to remove.
 */
LightingController.prototype.remove = function(lightSource) {
    this.removingLightsList.push(lightSource);
    this.removingLights = true;
    var index = this.getIdOfLight(lightSource);
    delete this.list[index];
    this.save();
};

/**
 * Saves all the lights into the map's data.
 */
LightingController.prototype.save = function() {
    $gameMap.saveLightingData();
};

LightingController.prototype.getIdArrayFromRange = function(range) {
    var isEventList = false;
    var rangeArray = range.split('-');
    if (rangeArray[0].startsWith('e')) {
        rangeArray[0] = rangeArray[0].replace('e', '');
        rangeArray[1] = rangeArray[1].replace('e', '');
        isEventList = true;
    }

    var idArray = [];
    for (var i = Number(rangeArray[0]); i <= Number(rangeArray[1]); i++) {
        idArray.push((isEventList) ? 'e' + String(i) : String(i));
    }

    return idArray;
};

/**
 * Get the array of ids from a String
 * @param {String} ids The ids to select
 * @returns {String[]} The resulting array
 */
LightingController.prototype.getIdArray = function(ids) {
    var idList = [];
    if (ids.startsWith('[') && ids.endsWith(']')) {
        idList = ids.substring(1, ids.length - 1).replace(/\s/g, '').split(',');
        for (var i = idList.length - 1; i >= 0; i--) {
            if (idList[i].indexOf('-') !== -1) {
                var idRange = idList.splice(i, 1)[0];
                idList = idList.concat(this.getIdArrayFromRange(idRange));
            }
        }
    } else if (ids.indexOf('-') !== -1) {
        idList = this.getIdArrayFromRange(ids);
    } else {
        idList = [ids];
    }

    return idList;
};

/**
 * Gets an array of lights from a list of ids
 * @param {String} ids The ids to select
 * @returns {LightSource[]}
 */
LightingController.prototype.getLightArrayById = function(ids) {
    var lightList = [];
    var idList = this.getIdArray(ids);

    idList.forEach(function(id) {
        lightList.push(this.getLightById(id));
    }, this);

    return lightList;
};

/**
 * Gets the light with the specified id
 *
 * @param {string} id The id of the light. Start with "e" if it is a light from an event
 * @return {LightSource | LightSourceEvent}
 */
LightingController.prototype.getLightById = function(id) {
    if (String(id).toLowerCase().startsWith("e")) {
        id = id.substring(1);
        return this.eventList[Number(id)];
    }

    return this.list[Number(id)];
};

/**
 * Get the id of the light
 * @param {LightSource} light The light to search, mustn't be an event light
 * @returns {string|null} The id of the light
 */
LightingController.prototype.getIdOfLight = function(light) {
    for (var key in this.list) {
        if (this.list[key] === light) return key;
    }

    return null;
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

Light_Data.prototype.getData = function(mapId, lightId, dataName, defaultValue) {
    if (!(mapId in this.data) || !(lightId in this.data[mapId]) || !(dataName in this.data[mapId][lightId]))
        return defaultValue;

    return this.data[mapId][lightId][dataName];
};

Light_Data.prototype.setData = function(mapId, lightId, dataName, value) {
    if (!(mapId in this.data)) this.data[mapId] = {};
    if (!(lightId in this.data[mapId])) this.data[mapId][lightId] = {};
    this.data[mapId][lightId][dataName] = value;
};

Light_Data.prototype.removeData = function(mapId, lightId, dataName) {
    if (!(mapId in this.data) || !(lightId in this.data[mapId])) return;
    delete this.data[mapId][lightId][dataName];
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
    this._lightingSurface = new LightingSurface(false);
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

Spriteset_Map.prototype.createUpperLayer = function() {
    Spriteset_Base.prototype.createUpperLayer.call(this);
    this.createLightingToolLayer();
};

Spriteset_Map.prototype.createLightingToolLayer = function() {
    this._lightIconsSurface = new LightIconsSurface();
    this.addChild(this._lightIconsSurface);
};

//-----------------------------------------------------------------------------
// Spriteset_Battle
//
//
if (GameEditor.TOOLS.TintDuringBattle.toLowerCase() === "true" && !DataManager.isBattleTest()) {
var FLZ_Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function () {
    FLZ_Spriteset_Battle_createLowerLayer.call(this);
    this.createLighting();
};

var FLZ_Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function () {
    FLZ_Spriteset_Battle_update.call(this);
    this.updateLighting();
};

Spriteset_Battle.prototype.createLighting = function () {
    $gameLighting.clear();
    this._lightingTexture = PIXI.RenderTexture.create(Graphics.width, Graphics.height);
    this._lightingSurface = new LightingSurface(true);
    this._lightingSprite = new PIXI.Sprite();
    this._lightingSprite.texture = this._lightingTexture;
    this._lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    this._lightingSprite.alpha = 1.0;
    this.addChild(this._lightingSprite);
};

Spriteset_Battle.prototype.updateLighting = function () {
    this._lightingSurface.update();
    Graphics._renderer.render(this._lightingSurface, this._lightingTexture, false);
};

Spriteset_Battle.prototype.createUpperLayer = function() {
    Spriteset_Base.prototype.createUpperLayer.call(this);
    this.createLightingToolLayer();
};

Spriteset_Battle.prototype.createLightingToolLayer = function() {
    this._lightIconsSurface = new LightIconsSurface();
    this.addChild(this._lightIconsSurface);
};
}

//-----------------------------------------------------------------------------
// LightingSurface
//
//

function LightingSurface() {
    this.initialize.apply(this, arguments);
}

LightingSurface.prototype = Object.create(PIXI.Container.prototype);
LightingSurface.prototype.constructor = LightingSurface;

LightingSurface.prototype.initialize = function(isBattle) {
    PIXI.Container.call(this);
    this._width = Graphics.width; 
    this._height = Graphics.height;
    this._createSurface();
    if (isBattle) this._createBattleLights();
    else this._createLights();
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
    $gameMap.getLightingData(this);
    $gameLighting.checkPlayerTorch();
};

LightingSurface.prototype._createBattleLights = function() {
    // From enemies
    var enemies = $gameTroop.members();
    for (var i = 0; i < enemies.length; i++) {
        var data = $dataEnemies[enemies[i].enemyId()].meta;
        if (enemies[i] && data.light != null) {
            this.addLightSourceToEnemy(data.light, enemies[i], i);
        }
    }

    // From editor
    $gameMap.getBattleLightingData(this);
};

LightingSurface.prototype.createEditorLights = function(lightSourcesData) {
    if (Array.isArray(lightSourcesData)) {
        var dataCopy = lightSourcesData;
        lightSourcesData = {};
        for (var i = 0; i < dataCopy.length; i++) {
            lightSourcesData[i] = dataCopy[i];
        }
        lightSourcesData.nextId = dataCopy.length;
    }

    if (lightSourcesData) {
        var keyArray = Object.keys(lightSourcesData);
        for (var i = 0; i < keyArray.length; i++) {
            var key = keyArray[i];

            if (key === "nextId") {
                $gameLighting.list.nextId = lightSourcesData.nextId;
                continue;
            }

            var lightSourceData = lightSourcesData[key];
            var lightSource = new LightSource(lightSourceData.filename,
                lightSourceData.x, lightSourceData.y, lightSourceData.hue,
                lightSourceData.scale, lightSourceData.alpha, key);
            if (lightSourceData.pulseAnimation === true) {
                lightSource.setupPulseAnimation(lightSourceData.pulseMin,
                    lightSourceData.pulseMax, lightSourceData.pulseSpeed);
            }
            if (lightSourceData.flickerAnimation === true) {
                lightSource.setupFlickerAnimation(lightSourceData.flickIntensity,
                    lightSourceData.flickSpeed);
            }

            lightSource.setDefaultOff(lightSourceData.defaultOff || false);
            this.addChild(lightSource);
            $gameLighting.add(lightSource, key);
        }
    }
};

LightingSurface.getParams = function(params) {
    return params.substring(params.indexOf('(') + 1, params.indexOf(')')).replace(/\s/g, '').split(',');
};

LightingSurface.prototype.setSourceParams = function(lightSource, paramList) {
    // Setup animations
    for (var i = 0; i < paramList.length; i++) {
        if (!paramList[i]) return;
        var params = paramList[i];
        if (params.startsWith("addPulse")) {
            this.setupPulseAnimationToEvent(lightSource, LightingSurface.getParams(params))
        } else if (params.startsWith("addFlick")) {
            this.setupFlickAnimationToEvent(lightSource, LightingSurface.getParams(params))
        } else if (params.startsWith("turnOff")) {
            lightSource.setDefaultOff(true);
        }
    }
};

LightingSurface.prototype.addLightSourceToEnemy = function(type, enemy, id) {
    if (!type) return;
    if (!String(id).startsWith('e')) id = 'e' + id;
    var x = enemy.screenX();
    var y = enemy.screenY();
    var lightSource;
    var params;
    var configStartIndex = type.indexOf('.') + 1;

    if (type.startsWith("Bonfire"))
        lightSource = new LightSourceEnemy.initializeFromPreset(GameEditor.TOOLS.Bonfire, id, enemy);
    else if (type.startsWith("Torch"))
        lightSource = new LightSourceEnemy.initializeFromPreset(GameEditor.TOOLS.Torch, id, enemy);
    else if (type.startsWith("Ambient"))
        lightSource = new LightSourceEnemy.initializeFromPreset(GameEditor.TOOLS.Ambient, id, enemy);
    else if (type.startsWith("Light")) {
        configStartIndex = type.indexOf(')') + 2;
        params = LightingSurface.getParams(type);
        if (params.length < 4) return;

        var filename = String(params[0]);
        var scale = new PIXI.Point(parseFloat(params[1]), parseFloat(params[1]));
        var hue = parseInt(params[2]);
        var alpha = parseFloat(params[3]);
        lightSource = new LightSourceEnemy(filename, x, y, hue, scale, alpha, id);
    } else return;

    if (configStartIndex < type.length) {
        var lightConfig = type.substring(configStartIndex).split(/\.(?=[a-zA-Z])/);
        this.setSourceParams(lightSource, lightConfig);
    }

    this.addChild(lightSource);
    $gameLighting.eventList[id.substring(1)] = lightSource;
};

LightingSurface.prototype.addLightSourceToEvent = function(note, x, y, eventId) {
    if (!note) return;
    var lightSource;
    var params;
    var configStartIndex = note.indexOf('.') + 1;

    if (note.startsWith("Bonfire"))
        lightSource = new LightSourceEvent.initializeFromPreset(GameEditor.TOOLS.Bonfire, x, y, eventId);
    else if (note.startsWith("Torch"))
        lightSource = new LightSourceEvent.initializeFromPreset(GameEditor.TOOLS.Torch, x, y, eventId);
    else if (note.startsWith("Ambient"))
        lightSource = new LightSourceEvent.initializeFromPreset(GameEditor.TOOLS.Ambient, x, y, eventId);
    else if (note.startsWith("Light")) {
        configStartIndex = note.indexOf(')') + 2;
        params = LightingSurface.getParams(note);
        if (params.length < 4) return;

        var filename = String(params[0]);
        var scale = new PIXI.Point(parseFloat(params[1]), parseFloat(params[1]));
        var hue = parseInt(params[2]);
        var alpha = parseFloat(params[3]);
        lightSource = new LightSourceEvent(filename, x, y, hue, scale, alpha, eventId);
    } else return;

    if (configStartIndex < note.length) {
        var lightConfig = note.substring(configStartIndex).split(/\.(?=[a-zA-Z])/);
        this.setSourceParams(lightSource, lightConfig);
    }

    this.addChild(lightSource);
    $gameLighting.eventList[eventId] = lightSource;
};

LightingSurface.prototype.setupPulseAnimationToEvent = function(lightSource, params) {
    var pulseMin = parseFloat(params[0]);
    var pulseMax = parseFloat(params[1]);
    var pulseSpeed = parseInt(params[2]);
    lightSource.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
};

LightingSurface.prototype.setupFlickAnimationToEvent = function(lightSource, params) {
    var flickIntensity = parseInt(params[0]);
    var flickSpeed = parseInt(params[1]);
    lightSource.setupFlickerAnimation(flickIntensity, flickSpeed);
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
        while (list.length) {
            this.addChild(list[0]);
            $gameLighting.addingLightsList.splice(0, 1);
        }
        $gameLighting.addingLights = false;
        $gameLighting.refresh = true;
    }
    if ($gameLighting.removingLights === true) {
        var list = $gameLighting.removingLightsList;
        while (list.length) {
            this.removeChild(list[0]);
            $gameLighting.removingLightsList.splice(0, 1);
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
    this.defaultOff = false;
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
    if (typeof this.id === "undefined") this.id = $gameLighting.getIdOfLight(this);
    return this.id;
};

LightSource.prototype.addTempData = function(dataName, value) {
    $gameLighting.lightData.setData($gameMap.mapId(), this.getId(), dataName, value);
};

LightSource.prototype.getTempData = function(dataName, defaultValue) {
    return $gameLighting.lightData.getData($gameMap.mapId(), this.getId(), dataName, defaultValue);
};

LightSource.prototype.hasTempData = function(dataName) {
    return $gameLighting.lightData.getData($gameMap.mapId(), this.getId(), dataName, undefined) != null;
};

LightSource.prototype.removeTempData = function(dataName) {
    $gameLighting.lightData.removeData($gameMap.mapId(), this.getId(), dataName);
};

LightSource.prototype.setDefaultOff = function(state) {
    this.defaultOff = state;
    if (!this.hasTempData("powered")) this._off = state;
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

LightSource.prototype.removePulseAnimation = function() {
    this.pulseAnimation = false;
    this.pulseMin = 0;
    this.pulseMax = 0;
    this.pulseSpeed = 0;
    if (this.flickerAnimation === false) {
        this.mode = 0;
    }
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

LightSource.prototype.removeFlickerAnimation = function() {
    $gameEditor.lightingTool.lightSource.flickerAnimation = false;
    $gameEditor.lightingTool.lightSource.flickIntensity = 0;
    $gameEditor.lightingTool.lightSource.flickSpeed = 0;
    if ($gameEditor.lightingTool.lightSource.pulseAnimation === false) {
        $gameEditor.lightingTool.lightSource.mode = 0;
    }
}

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

LightSource.prototype.increaseSize = function(scale) {
    var newValue = Number(this.oscale.x) + scale;
    this.modifySize(new PIXI.Point(newValue, newValue));
};

LightSource.prototype.decreaseSize = function(scale) {
    var newValue = this.oscale.x - scale;
    this.modifySize(new PIXI.Point(newValue, newValue));
};

LightSource.prototype.modifySize = function(scale) {
    if (scale == null) scale = new PIXI.Point(1.0, 1.0);
    if (scale.x == null || isNaN(scale.x)) scale.x = 1.0;
    if (scale.y == null || isNaN(scale.y)) scale.y = 1.0;

    scale.x = Math.max(Number(scale.x).toFixed(2), 0);
    scale.y = Math.max(Number(scale.y).toFixed(2), 0);

    this.oscale = new PIXI.Point(scale.x, scale.y);
    this.scale = new PIXI.Point(scale.x, scale.y);
    if (this.pulseAnimation === true) {
        var oldMax = this.pulseMax;
        this.pulseMax = this.scale.x;
        this.pulseMin -= oldMax - this.pulseMax;
        this.pulseMin = Math.round(this.pulseMin * 100) / 100;
        if (this.pulseMin < 0) this.pulseMin = 0;

        this.refreshPulseAnimation();
    }
};

LightSource.prototype.increaseOpacity = function(alpha) {
    this.modifyOpacity(this.oalpha + alpha);
};

LightSource.prototype.decreaseOpacity = function(alpha) {
    this.modifyOpacity(this.oalpha - alpha);
};

LightSource.prototype.modifyOpacity = function(alpha) {
    if (alpha == null) alpha = 1;
    alpha = Math.round(alpha * 100) / 100;
    this.oalpha = this.alpha = Math.max(Math.min(alpha, 1), 0);
};

LightSource.prototype.modifyColor = function(hue) {
    if (hue >= 0 && hue <= 359) {
        this.hue = hue;
        if (!this._hasTemporaryHue) {
            this.tint = Number(GameEditor.getColor(hue) || 0xFFFFFF);
        }
    } else if (hue === null) {
        this.hue = hue;
        this.tint = 0xFFFFFF;
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

LightSource.prototype.decreasePulseMin = function(pulse) {
    this.modifyPulseMin(this.pulseMin - pulse);
};

LightSource.prototype.increasePulseMin = function(pulse) {
    this.modifyPulseMin(this.pulseMin + pulse);
};

LightSource.prototype.modifyPulseMin = function(pulse) {
    this.pulseMin = Math.max(Math.round(pulse * 100) / 100, 0);
    this.refreshPulseAnimation();
};

LightSource.prototype.decreasePulseMax = function(pulse) {
    this.modifyPulseMax(this.pulseMax - pulse);
};

LightSource.prototype.increasePulseMax = function(pulse) {
    this.modifyPulseMax(this.pulseMax + pulse);
};

LightSource.prototype.modifyPulseMax = function(pulse) {
    this.pulseMax = Math.max(Math.round(pulse * 100) / 100, 0);
    this.refreshPulseAnimation();
};

LightSource.prototype.decreasePulseSpeed = function(pulse) {
    this.modifyPulseSpeed(this.pulseSpeed - pulse);
};

LightSource.prototype.increasePulseSpeed = function(pulse) {
    this.modifyPulseSpeed(this.pulseSpeed + pulse);
};

LightSource.prototype.modifyPulseSpeed = function(pulse) {
    this.pulseSpeed = Math.max(Math.round(pulse * 100) / 100, 0);
    this.refreshPulseAnimation();
};

LightSource.prototype.decreaseFlickIntensity = function(flick) {
    this.modifyFlickIntensity(this.flickIntensity - flick);
};

LightSource.prototype.increaseFlickIntensity = function(flick) {
    this.modifyFlickIntensity(this.flickIntensity + flick);
};

LightSource.prototype.modifyFlickIntensity = function(flick) {
    this.flickIntensity = Math.max(Math.round(flick * 100) / 100, 0);
    this.refreshFlickerAnimation();
};

LightSource.prototype.decreaseFlickSpeed = function(flick) {
    this.modifyFlickSpeed(this.flickSpeed - flick);
};

LightSource.prototype.increaseFlickSpeed = function(flick) {
    this.modifyFlickSpeed(this.flickSpeed + flick);
};

LightSource.prototype.modifyFlickSpeed = function(flick) {
    this.flickSpeed = Math.max(Math.round(flick * 100) / 100, 0);
    this.refreshFlickerAnimation();
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
        if (this._flickCounter > 0 && (GameEditor.TOOLS.RandomFlick === "false" ||
                Math.randomInt(this._flickCounter / GameEditor.TOOLS.RandomFlickSpeedFactor) !== 0)) {
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
        flickSpeed: this.flickSpeed,
        defaultOff: this.defaultOff
    };
};

LightSource.prototype.setData = function(data) {
    this.filename = data['filename'];
    this.ox = data['x'];
    this.oy = data['y'];
    this.hue = data['hue'];
    this.oscale = data['scale'];
    this.oalpha = data['alpha'];
    this.setDefaultOff(data['defaultOff'] || false);
    
    if (data['pulseAnimation']) {
        this.setupPulseAnimation(data['pulseMin'], data['pulseMax'], data['pulseSpeed']);
    }
    
    if (data['flickerAnimation']) {
        this.setupFlickerAnimation(data['flickIntensity'], data['flickSpeed']);
    }
};

LightSource.initializeFromPreset = function(preset, x, y, id, CalledClass) {
    var filename = preset.filename;
    var hue = preset.color;
    var scale = new PIXI.Point(preset.scale, preset.scale);
    var alpha = preset.alpha;
    var lightSource;

    if (CalledClass) lightSource = new CalledClass(filename, x, y, hue, scale, alpha, id);
    else lightSource = new LightSource(filename, x, y, hue, scale, alpha, id);

    lightSource.ox = x;
    lightSource.oy = y;

    if (preset.pulse) {
        var pulseMin = preset.pulseMin;
        var pulseMax = preset.pulseMax;
        var pulseSpeed = preset.pulseSpeed;
        lightSource.setupPulseAnimation(pulseMin, pulseMax, pulseSpeed);
    }

    if (preset.flick) {
        var flickIntensity = preset.flickIntensity;
        var flickSpeed = preset.flickSpeed;
        lightSource.setupFlickerAnimation(flickIntensity, flickSpeed);
    }

    return lightSource;
};


//-----------------------------------------------------------------------------
// LightSourceEnemy
//
//

function LightSourceEnemy() {
    this.initialize.apply(this, arguments);
}

LightSourceEnemy.prototype = Object.create(LightSource.prototype);
LightSourceEnemy.prototype.constructor = LightSourceEnemy;

LightSourceEnemy.prototype.initialize = function(filename, x, y, hue, scale, alpha, id, enemy) {
    LightSource.prototype.initialize.call(this, filename, x, y, hue, scale, alpha, "e" + id);
    this.enemy = enemy;
    this.ox = x;
    this.oy = y;
    this.offsetX = this.offsetY = 0;
};

LightSourceEnemy.prototype._updateVisibility = function() {
    LightSource.prototype._updateVisibility.call(this);

    if (this.enemy.isHidden() || this.enemy.isDead()) this.visible = false;
};

LightSourceEnemy.prototype._updatePosition = function() {
    if (this.offsetY === 0) this._updateYOffset();

    this.x = this.enemy.screenX();
    this.y = this.enemy.screenY() + this.offsetY;
};

LightSourceEnemy.loadEnemyBitmap = function(name, hue) {
    if ($gameSystem.isSideView()) {
        return ImageManager.loadSvEnemy(name, hue);
    } else {
        return ImageManager.loadEnemy(name, hue);
    }
};

LightSourceEnemy.prototype._updateYOffset = function() {
    this.offsetY = -LightSourceEnemy.loadEnemyBitmap(this.enemy.battlerName(), this.enemy.battlerHue()).height / 2;
};

LightSourceEnemy.initializeFromPreset = function(preset, id, enemy) {
    var lightSource = LightSource.initializeFromPreset(preset, enemy.screenX(), enemy.screenY(), id, LightSourceEnemy);
    lightSource.enemy = enemy;
    return lightSource;
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
    LightSource.prototype.initialize.call(this, filename, x, y, hue, scale, alpha, "e" + String(eventId));
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

LightSourceEvent.initializeFromPreset = function(preset, x, y, id) {
    return LightSource.initializeFromPreset(preset, x, y, id, LightSourceEvent);
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
    this._lightingBattleData = new Lighting_Battle(mapId);
};

Game_Map.prototype.getLightingData = function(instance) {
    this._lightingMapData.load(instance);
};

Game_Map.prototype.getBattleLightingData = function(instance) {
    this._lightingBattleData.load(instance);
};

Game_Map.prototype.saveLightingData = function() {
    if (SceneManager._scene instanceof Scene_Map) this._lightingMapData.save();
    else this._lightingBattleData.save();
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
// Lighting_Data
//
//

function Lighting_Data() {
    this.initialize.apply(this, arguments);
}

Lighting_Data.prototype.initialize = function() {
    this._file = null;
};

Lighting_Data.prototype.load = function(instance) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this._file);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        var data = JSON.parse(LZString.decompressFromBase64(xhr.responseText));

        LightingSurface.prototype.createEditorLights.call(instance, data);
    };
    xhr.send();
};

Lighting_Data.prototype.save = function() {
    var fs = require('fs');
    var data = this._generateData();
    var file = JSON.stringify(data);
    fs.writeFile(StorageManager.localContentPath() + this._file, LZString.compressToBase64(file));
};

Lighting_Data.prototype._generateData = function() {
    var data = {};
    Object.keys($gameLighting.list).forEach(function(key) {
        if (key === "nextId") {
            data.nextId = $gameLighting.list.nextId;
        } else if ($gameLighting.list[key].eventId == null) {
            data[key] = $gameLighting.list[key].getData();
        }
    });
    return data;
};

//-----------------------------------------------------------------------------
// Lighting_Map
//

function Lighting_Map() {
    this.initialize.apply(this, arguments);
}

Lighting_Map.prototype = Object.create(Lighting_Data.prototype);
Lighting_Map.prototype.constructor = Lighting_Map;

Lighting_Map.prototype.initialize = function(mapId) {
    this._mapId = mapId;
    this._file = 'data/Map%1lighting.json'.format(mapId.padZero(3));
};

//-----------------------------------------------------------------------------
// Lighting_Battle
//

function Lighting_Battle() {
    this.initialize.apply(this, arguments);
}

Lighting_Battle.prototype = Object.create(Lighting_Data.prototype);
Lighting_Battle.prototype.constructor = Lighting_Battle;

Lighting_Battle.prototype.initialize = function(mapId) {
    this._mapId = mapId;
    this._file = 'data/Map%1BattleLighting.json'.format(mapId.padZero(3));
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
    var _this = this;
    this.addButton('Lights', function() {
        $gameEditor.toggleLightingEditor();
    });
    this._lightingToolButtons = [];
    var newButton = function(i) {
        var spacing = 32;
        var y = spacing * i;
        if (_this._isBattle) y += 48;
        return new ButtonText(20, 20 + y, $lights[i], function() {
            var lightSource = $gameLighting.addByType($lights[i]);
            $gameEditor.lightingTool.setLight(lightSource);

            EditorHistory.addToHistory({
                type: "CREATE_LIGHT",
                source: lightSource,
                sourceId: $gameLighting.getIdOfLight(lightSource)
            });
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
    return (Object.keys(this._clipboardData).length !== 0 || this._clipboardData.constructor !== Object)
        && this._clipboardData != null;
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
    this.frozen = false;
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
    var _this = this;
    
    this.addChild(new ButtonText(x - 70, 47, ' < ', function() {
        EditorHistory.addMove($gameEditor.lightingTool.lightSource);
        $gameEditor.lightingTool.lightSource.ox -= 1;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 47, ' > ', function() {
        EditorHistory.addMove($gameEditor.lightingTool.lightSource);
        $gameEditor.lightingTool.lightSource.ox += 1;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 74, ' < ', function() {
        EditorHistory.addMove($gameEditor.lightingTool.lightSource);
        $gameEditor.lightingTool.lightSource.oy -= 1;
        $gameLighting.save();
    }));
    this.addChild(new ButtonText(x - 38, 74, ' > ', function() {
        EditorHistory.addMove($gameEditor.lightingTool.lightSource);
        $gameEditor.lightingTool.lightSource.oy += 1;
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 101, ' < ', function() {
        var oldValue = Number($gameEditor.lightingTool.lightSource.oscale.x);
        $gameEditor.lightingTool.lightSource.decreaseSize(0.05);
        var value = oldValue - Number($gameEditor.lightingTool.lightSource.oscale.x);
        EditorHistory.addToHistory({
            type: "DECREASE_SCALE",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 101, ' > ', function() {
        EditorHistory.addScaleIncrease($gameEditor.lightingTool.lightSource, 0.05);
        $gameEditor.lightingTool.lightSource.increaseSize(0.05);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 129, ' < ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.oalpha;
        $gameEditor.lightingTool.lightSource.decreaseOpacity(0.05);
        var value = oldValue - $gameEditor.lightingTool.lightSource.oalpha;
        EditorHistory.addToHistory({
            type: "DECREASE_ALPHA",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 129, ' > ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.oalpha;
        $gameEditor.lightingTool.lightSource.increaseOpacity(0.05);
        var value = $gameEditor.lightingTool.lightSource.oalpha - oldValue;
        EditorHistory.addAlphaIncrease($gameEditor.lightingTool.lightSource, value);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 169, ' < ', function() {
        _this._togglePulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 169, ' > ', function() {
        _this._togglePulseAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 196, ' < ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.pulseMin;
        $gameEditor.lightingTool.lightSource.decreasePulseMin(0.05);
        var value = oldValue - $gameEditor.lightingTool.lightSource.pulseMin;
        EditorHistory.addToHistory({
            type: "DECREASE_PULSE_MIN",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 196, ' > ', function() {
        EditorHistory.addPulseMinIncrease($gameEditor.lightingTool.lightSource, 0.05);
        $gameEditor.lightingTool.lightSource.increasePulseMin(0.05);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 223, ' < ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.pulseMax;
        $gameEditor.lightingTool.lightSource.decreasePulseMax(0.05);
        var value = oldValue - $gameEditor.lightingTool.lightSource.pulseMax;
        EditorHistory.addToHistory({
            type: "DECREASE_PULSE_MAX",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 223, ' > ', function() {
        EditorHistory.addPulseMaxIncrease($gameEditor.lightingTool.lightSource, 0.05);
        $gameEditor.lightingTool.lightSource.increasePulseMax(0.05);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 250, ' < ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.pulseSpeed;
        $gameEditor.lightingTool.lightSource.decreasePulseSpeed(0.05);
        var value = oldValue - $gameEditor.lightingTool.lightSource.pulseSpeed;
        EditorHistory.addToHistory({
            type: "DECREASE_PULSE_SPEED",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 250, ' > ', function() {
        EditorHistory.addPulseSpeedIncrease($gameEditor.lightingTool.lightSource, 0.05);
        $gameEditor.lightingTool.lightSource.increasePulseSpeed(0.05);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 290, ' < ', function() {
        _this._toggleFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 290, ' > ', function() {
        _this._toggleFlickerAnimation();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 317, ' < ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.flickIntensity;
        $gameEditor.lightingTool.lightSource.decreaseFlickIntensity(0.05);
        var value = oldValue - $gameEditor.lightingTool.lightSource.flickIntensity;
        EditorHistory.addToHistory({
            type: "DECREASE_FLICK_INTENSITY",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 317, ' > ', function() {
        EditorHistory.addFlickIntensityIncrease($gameEditor.lightingTool.lightSource, 0.05);
        $gameEditor.lightingTool.lightSource.increaseFlickIntensity(0.05);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 344, ' < ', function() {
        var oldValue = $gameEditor.lightingTool.lightSource.flickSpeed;
        $gameEditor.lightingTool.lightSource.decreaseFlickSpeed(0.05);
        var value = oldValue - $gameEditor.lightingTool.lightSource.flickSpeed;
        EditorHistory.addToHistory({
            type: "DECREASE_FLICK_SPEED",
            value: value,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 344, ' > ', function() {
        EditorHistory.addFlickSpeedIncrease($gameEditor.lightingTool.lightSource, 0.05);
        $gameEditor.lightingTool.lightSource.increaseFlickSpeed(0.05);
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 70, 385, ' < ', function() {
        _this._toggleDefaultPower();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 38, 385, ' > ', function() {
        _this._toggleDefaultPower();
        $gameLighting.save();
    }, true));
    this.addChild(new ButtonText(x - 48, 415, 'null', function() {
        EditorHistory.addHueChange($gameEditor.lightingTool.lightSource);
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

    var FLZ_SliderHue_updateMouseBehaviour = this.sliderHue._updateMouseBehavior;
    this.sliderHue._updateMouseBehavior = function() {
        var dragging = this._dragging;
        FLZ_SliderHue_updateMouseBehaviour.call(this);
        if (!dragging && this._dragging) {
            EditorHistory.addHueChange($gameEditor.lightingTool.lightSource);
        }
    };
    
    this.addChild(this.sliderHue);
    this.addChild(new ButtonText(x - 68, 480, 'Delete', function() {
        $gameEditor.lightingTool.deleteLight();
        $gameLighting.save();
    }));
};

Lighting_Tool.prototype._togglePulseAnimation = function() {
    if ($gameEditor.lightingTool.lightSource.pulseAnimation) {
        EditorHistory.addToHistory({
            type: "PULSE",
            value: false,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource),
            properties: {
                min: $gameEditor.lightingTool.lightSource.pulseMin,
                max: $gameEditor.lightingTool.lightSource.pulseMax,
                speed: $gameEditor.lightingTool.lightSource.pulseSpeed
            }
        });
        $gameEditor.lightingTool.lightSource.removePulseAnimation();
    } else {
        EditorHistory.addToHistory({
            type: "PULSE",
            value: true,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameEditor.lightingTool.lightSource.setupPulseAnimation();
    }
};

Lighting_Tool.prototype._toggleFlickerAnimation = function() {
    if ($gameEditor.lightingTool.lightSource.flickerAnimation) {
        EditorHistory.addToHistory({
            type: "FLICKER",
            value: false,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource),
            properties: {
                intensity: $gameEditor.lightingTool.lightSource.flickIntensity,
                speed: $gameEditor.lightingTool.lightSource.flickSpeed
            }
        });
        $gameEditor.lightingTool.lightSource.removeFlickerAnimation();
    } else {
        EditorHistory.addToHistory({
            type: "FLICKER",
            value: true,
            sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
        });
        $gameEditor.lightingTool.lightSource.setupFlickerAnimation();
    }
};

Lighting_Tool.prototype._toggleDefaultPower = function() {
    var newValue = !$gameEditor.lightingTool.lightSource.defaultOff;
    $gameEditor.lightingTool.lightSource.setDefaultOff(newValue);
    EditorHistory.addToHistory({
        type: "POWER",
        value: newValue,
        sourceId: $gameLighting.getIdOfLight($gameEditor.lightingTool.lightSource)
    })
};

Lighting_Tool.prototype.openNumberInput = function(text, number, callback) {
    if (this.isFrozen()) return;

    var input = new NumberInput(text, Graphics.width / 3, Graphics.height / 3, number, callback);
    this.addChild(input);
    this.frozen = true;
};

Lighting_Tool.prototype._createLabels = function() {
    var x = Graphics.width - 90;
    var _this = this;
    this.labelTitle = new Label(x, 25, 'LightSourceID 1', 'right', 16, true);
    this.addChild(this.labelTitle);

    this.labelX = new Label(x, 65, 'X: 0', 'right', null, null, function() {
        _this.openNumberInput("X Coordinate", _this.lightSource.ox, function(number) {
            EditorHistory.addMove(_this.lightSource);
            _this.lightSource.ox = number;
            $gameLighting.save();
        });
    });
    this.addChild(this.labelX);

    this.labelY = new Label(x, 90, 'Y: 0', 'right', null, null, function() {
        _this.openNumberInput("Y Coordinate", _this.lightSource.oy, function(number) {
            EditorHistory.addMove(_this.lightSource);
            _this.lightSource.oy = number;
            $gameLighting.save();
        });
    });
    this.addChild(this.labelY);

    this.labelSize = new Label(x, 115, 'Size: 1.0', 'right', null, null, function() {
        _this.openNumberInput("Scale", _this.lightSource.oscale.x, function(number) {
            var oldValue = Number(_this.lightSource.oscale.x);
            _this.lightSource.modifySize(new PIXI.Point(number, number));
            EditorHistory.addScaleIncrease(_this.lightSource, Number(_this.lightSource.oscale.x) - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelSize);

    this.labelAlpha = new Label(x, 140, 'Alpha: 1.0', 'right', null, null, function() {
        _this.openNumberInput("Opacity", _this.lightSource.oalpha, function(number) {
            var oldValue = _this.lightSource.oalpha;
            _this.lightSource.modifyOpacity(number);
            EditorHistory.addAlphaIncrease(_this.lightSource, _this.lightSource.oalpha - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelAlpha);

    this.labelPulse = new Label(x, 185, 'Pulse: false', 'right');
    this.addChild(this.labelPulse);

    this.labelPulseMin = new Label(x, 210, 'pulseMin: 0', 'right', null, null, function() {
        if (!_this.lightSource.pulseAnimation) return;
        _this.openNumberInput("Pulse Min", _this.lightSource.pulseMin, function(number) {
            var oldValue = _this.lightSource.pulseMin;
            _this.lightSource.modifyPulseMin(number);
            EditorHistory.addPulseMinIncrease(_this.lightSource, _this.lightSource.pulseMin - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelPulseMin);

    this.labelPulseMax = new Label(x, 235, 'pulseMax: 0', 'right', null, null, function() {
        if (!_this.lightSource.pulseAnimation) return;
        _this.openNumberInput("Pulse Max", _this.lightSource.pulseMax, function(number) {
            var oldValue = _this.lightSource.pulseMax;
            _this.lightSource.modifyPulseMax(number);
            EditorHistory.addPulseMaxIncrease(_this.lightSource, _this.lightSource.pulseMax - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelPulseMax);

    this.labelPulseSpeed = new Label(x, 260, 'pulseSpeed: 0', 'right', null, null, function() {
        if (!_this.lightSource.pulseAnimation) return;
        _this.openNumberInput("Pulse Speed", _this.lightSource.pulseSpeed, function(number) {
            var oldValue = _this.lightSource.pulseSpeed;
            _this.lightSource.modifyPulseSpeed(number);
            EditorHistory.addPulseSpeedIncrease(_this.lightSource, _this.lightSource.pulseSpeed - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelPulseSpeed);

    this.labelFlick = new Label(x, 305, 'Flick: false', 'right');
    this.addChild(this.labelFlick);

    this.labelFlickIntensity = new Label(x, 330, 'flickIntensity: 0', 'right', null, null, function() {
        if (!_this.lightSource.flickerAnimation) return;
        _this.openNumberInput("Flick Intensity", _this.lightSource.flickIntensity, function(number) {
            var oldValue = _this.lightSource.flickIntensity;
            _this.lightSource.modifyFlickIntensity(number);
            EditorHistory.addFlickIntensityIncrease(_this.lightSource, _this.lightSource.flickIntensity - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelFlickIntensity);

    this.labelFlickSpeed = new Label(x, 355, 'flickSpeed: 0', 'right', null, null, function() {
        if (!_this.lightSource.flickerAnimation) return;
        _this.openNumberInput("Flick Speed", _this.lightSource.flickSpeed, function(number) {
            var oldValue = _this.lightSource.flickSpeed;
            _this.lightSource.modifyFlickSpeed(number);
            EditorHistory.addFlickSpeedIncrease(_this.lightSource, _this.lightSource.flickSpeed - oldValue);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelFlickSpeed);

    this.labelPower = new Label(x, 400, 'Powered: true', 'right');
    this.addChild(this.labelPower);

    this.labelHue = new Label(x, 425, 'HUE: null', 'right', null, null, function() {
        if (!_this.lightSource.flickerAnimation) return;
        _this.openNumberInput("Hue", _this.lightSource.hue, function(number) {
            EditorHistory.addHueChange(_this.lightSource);
            _this.lightSource.modifyColor(number);
            $gameLighting.save();
        });
    });
    this.addChild(this.labelHue);
};

Lighting_Tool.prototype.setLight = function(lightSource) {
    this.lightSource = lightSource;
    this.lightSourceId = $gameLighting.getIdOfLight(lightSource);
    this.show();
};

Lighting_Tool.prototype.deleteLight = function() {
    if (!this.lightSource) return;
    EditorHistory.addToHistory({
        type: "DELETE_LIGHT",
        source: this.lightSource,
        sourceId: $gameLighting.getIdOfLight(this.lightSource)
    });
    $gameLighting.remove(this.lightSource);
    this.hide();
};

Lighting_Tool.prototype.updateData = function() {
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
    this.labelFlickIntensity.setText('flickIntensity: ' + this.lightSource.flickIntensity);
    this.labelFlickSpeed.setText('flickSpeed: ' + this.lightSource.flickSpeed);
    this.labelHue.setText('HUE: ' + this.lightSource.hue);
    this.labelPower.setText('Powered: ' + !this.lightSource.defaultOff);
    if (this.lightSource.hue != null) this.sliderHue.setValue(this.lightSource.hue);
};

Lighting_Tool.prototype.update = function() {
    if (!this.lightSource || !this.visible) return;

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

Lighting_Tool.prototype.isFrozen = function() {
    return this.frozen;
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
    for (var key in $gameLighting.list) {
        var lightSourceIcon = new LightSourceIcon($gameLighting.list[key]);
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
            for (var key in $gameLighting.list) {
                var lightSourceIcon = new LightSourceIcon($gameLighting.list[key]);
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

            if (this._initialPosition == null && this._dragging === false) {
                this._initialPosition = [TouchInput.x, TouchInput.y];
            }
        }
    }
    if (TouchInput.isPressed()) {
        this._holdFrameCount--;
        if (this._holdFrameCount <= 0 && this.isTriggered() && this.hasMouseMoved()) {
            if (!this._dragging) {
                EditorHistory.addMove(this.lightSource);
            }

            this._dragging = true;
            $gameEditor.lightingTool._dragging = true;
            this._holdFrameCount = this._holdTime;
            this._initialPosition = null;
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

LightSourceIcon.prototype.hasMouseMoved = function() {
    return this._initialPosition == null || TouchInput.x !== this._initialPosition[0]
        || TouchInput.y !== this._initialPosition[1];
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

var FLZ_LightingTool_EditorHistory_onUndo = EditorHistory.onUndo;
EditorHistory.onUndo = function(action) {
    var source = $gameLighting.getLightById(action.sourceId);
    switch (action.type) {
        case "MOVE":
            action.newX = source.ox;
            action.newY = source.oy;
            source.ox = action.x;
            source.oy = action.y;
            break;
        case "DECREASE_SCALE":
            source.increaseSize(action.value);
            break;
        case "INCREASE_SCALE":
            source.decreaseSize(action.value);
            break;
        case "DECREASE_ALPHA":
            source.increaseOpacity(action.value);
            break;
        case "INCREASE_ALPHA":
            source.decreaseOpacity(action.value);
            break;
        case "PULSE":
            if (action.value) source.removePulseAnimation();
            else source.setupPulseAnimation(action.properties.min, action.properties.max, action.properties.speed);
            break;
        case "DECREASE_PULSE_MIN":
            source.increasePulseMin(action.value);
            break;
        case "INCREASE_PULSE_MIN":
            source.decreasePulseMin(action.value);
            break;
        case "DECREASE_PULSE_MAX":
            source.increasePulseMax(action.value);
            break;
        case "INCREASE_PULSE_MAX":
            source.decreasePulseMax(action.value);
            break;
        case "DECREASE_PULSE_SPEED":
            source.increasePulseSpeed(action.value);
            break;
        case "INCREASE_PULSE_SPEED":
            source.decreasePulseSpeed(action.value);
            break;
        case "FLICKER":
            if (action.value) source.removeFlickerAnimation();
            else source.setupFlickerAnimation(action.properties.intensity, action.properties.speed);
            break;
        case "DECREASE_FLICK_INTENSITY":
            source.increaseFlickIntensity(action.value);
            break;
        case "INCREASE_FLICK_INTENSITY":
            source.decreaseFlickIntensity(action.value);
            break;
        case "DECREASE_FLICK_SPEED":
            source.increaseFlickSpeed(action.value);
            break;
        case "INCREASE_FLICK_SPEED":
            source.decreaseFlickSpeed(action.value);
            break;
        case "CHANGE_HUE":
            action.newHue = source.hue;
            source.modifyColor(action.value);
            break;
        case "DELETE_LIGHT":
            $gameLighting.add(action.source, action.sourceId);
            break;
        case "CREATE_LIGHT":
            $gameLighting.remove(source);
            if (action.value === $gameEditor.lightingTool.lightSource) $gameEditor.lightingTool.hide();
            $gameLighting.list.nextId--;
            break;
        case "POWER":
            source.setDefaultOff(!action.value);
        default:
            FLZ_LightingTool_EditorHistory_onUndo.call(this, action);
            return;
    }
    $gameLighting.save();
};


var FLZ_LightingTool_EditorHistory_onRedo = EditorHistory.onRedo;
EditorHistory.onRedo = function(action) {
    var source = $gameLighting.getLightById(action.sourceId);
    switch (action.type) {
        case "MOVE":
            source.ox = action.newX;
            source.oy = action.newY;
            break;
        case "DECREASE_SCALE":
            source.decreaseSize(action.value);
            break;
        case "INCREASE_SCALE":
            source.increaseSize(action.value);
            break;
        case "DECREASE_ALPHA":
            source.decreaseOpacity(action.value);
            break;
        case "INCREASE_ALPHA":
            source.increaseOpacity(action.value);
            break;
        case "PULSE":
            if (action.value) source.setupPulseAnimation();
            else source.removePulseAnimation();
            break;
        case "DECREASE_PULSE_MIN":
            source.decreasePulseMin(action.value);
            break;
        case "INCREASE_PULSE_MIN":
            source.increasePulseMin(action.value);
            break;
        case "DECREASE_PULSE_MAX":
            source.decreasePulseMax(action.value);
            break;
        case "INCREASE_PULSE_MAX":
            source.increasePulseMax(action.value);
            break;
        case "DECREASE_PULSE_SPEED":
            source.decreasePulseSpeed(action.value);
            break;
        case "INCREASE_PULSE_SPEED":
            source.increasePulseSpeed(action.value);
            break;
        case "FLICKER":
            if (action.value) source.setupFlickerAnimation();
            else source.removeFlickerAnimation();
            break;
        case "DECREASE_FLICK_INTENSITY":
            source.decreaseFlickIntensity(action.value);
            break;
        case "INCREASE_FLICK_INTENSITY":
            source.increaseFlickIntensity(action.value);
            break;
        case "DECREASE_FLICK_SPEED":
            source.decreaseFlickSpeed(action.value);
            break;
        case "INCREASE_FLICK_SPEED":
            source.increaseFlickSpeed(action.value);
            break;
        case "CHANGE_HUE":
            source.modifyColor(action.newHue);
            break;
        case "DELETE_LIGHT":
            $gameLighting.remove(source);
            break;
        case "CREATE_LIGHT":
            $gameLighting.add(action.source);
            $gameEditor.lightingTool.setLight(action.source);
            break;
        case "POWER":
            source.setDefaultOff(action.value);
        default:
            FLZ_LightingTool_EditorHistory_onRedo.call(this, action);
            return;
    }
    $gameLighting.save();
};

//-----------------------------------------------------------------------------
// Graphics._onKeyDown
//
// Add useful shortcuts to the editor.

var FLZ_LightingTool_Graphics_copyPaste_onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
    if ($gameEditor == null || !$gameEditor.lightingTool.isFrozen()) {
        if (event.ctrlKey || event.metaKey) {
            if (GameEditor.ACTIVE && (SceneManager._scene instanceof Scene_Map
                    || SceneManager._scene instanceof Scene_Battle)) {
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
                            pastedSource.ox = $gamePlayer.x * $gameMap.tileWidth();
                            pastedSource.oy = $gamePlayer.y * $gameMap.tileHeight();
                            $gameLighting.add(pastedSource);
                            $gameLighting.save();
                            $gameEditor.lightingTool.setLight(pastedSource);

                            EditorHistory.addToHistory({
                                type: "CREATE_LIGHT",
                                source: pastedSource,
                                sourceId: $gameLighting.getIdOfLight(pastedSource)
                            });
                        }
                        break;
                    case 89: // Y
                        EditorHistory.redo();
                        break;
                    case 90: // Z
                        EditorHistory.undo();
                        break;
                }
            }
        } else if (!event.altKey) {
            if (GameEditor.ACTIVE && (SceneManager._scene instanceof Scene_Map
                    || SceneManager._scene instanceof Scene_Battle)) {
                switch (event.keyCode) {
                    case 46:
                    case 8: // Delete / Backspace
                        $gameEditor.lightingTool.deleteLight();
                        $gameLighting.save();
                        break;
                }
            }
        }
    }
    return FLZ_LightingTool_Graphics_copyPaste_onKeyDown.call(this, event);
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

Light_Limit.prototype.initialize = function(timeBeginIn, timeEndIn, mapIdIn, lightIdIn) {
    Time_Limit.prototype.initialize.call(this, timeBeginIn, timeEndIn);
    this.mapId = mapIdIn;
    this.lightId = lightIdIn;
    this._lastValue = -1;
};

Light_Limit.prototype.updateValue = function(value) {
    if ($gameMap.mapId() !== this.mapId) return;

    if (this._lastValue !== value) {
        this._lastValue = value;
        var light = $gameLighting.getLightById(this.lightId);
        if (light == null) return;
        if (value) { light.turnOn(); }
        else { light.turnOff(); }
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
    var lightArray;
    if (command === 'Light') {
        switch (args[0].toLowerCase()) {
            case 'on':
                lightArray = $gameLighting.getLightArrayById(args[1]);
                lightArray.forEach(function(light) { if (light != null) light.turnOn(); });
                break;
            case 'off':
                lightArray = $gameLighting.getLightArrayById(args[1]);
                lightArray.forEach(function(light) { if (light != null) light.turnOff(); });
                break;
            case 'limit':
                var timeBegin = String(args[1]).split(':');
                var timeEnd = String(args[2]).split(':');
                lightArray = $gameLighting.getIdArray(args[3]);
                lightArray.forEach(function(lightId) {
                    if ($gameLighting.getLightById(lightId) != null)
                        $gameTime.addLightLimit(new Light_Limit(timeBegin, timeEnd, $gameMap.mapId(), lightId));
                });
                break;
            case 'hue':
                if (args[1].toLowerCase() === "remove" || args[1].toLowerCase() === "reset") {
                    lightArray = $gameLighting.getLightArrayById(args[2]);
                    lightArray.forEach(function(light) {
                        if (light != null) light.removeTemporaryColor();
                    });
                }
                else {
                    var newHue = Number(args[1]);
                    lightArray = $gameLighting.getLightArrayById(args[2]);
                    lightArray.forEach(function(light) {
                        if (light != null) light.setTemporaryColor(newHue);
                    });
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

//-----------------------------------------------------------------------------
// EditorHistory
//
//
EditorHistory.addMove = function(lightSource) {
    EditorHistory.addToHistory({
        type: "MOVE",
        x: lightSource.ox,
        y: lightSource.oy,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addScaleIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_SCALE",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addAlphaIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_ALPHA",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addPulseMinIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_PULSE_MIN",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addPulseMaxIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_PULSE_MAX",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addPulseSpeedIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_PULSE_SPEED",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addFlickIntensityIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_FLICK_INTENSITY",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addFlickSpeedIncrease = function(lightSource, change) {
    EditorHistory.addToHistory({
        type: "INCREASE_FLICK_SPEED",
        value: change,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};

EditorHistory.addHueChange = function(lightSource) {
    EditorHistory.addToHistory({
        type: "CHANGE_HUE",
        value: lightSource.hue,
        sourceId: $gameLighting.getIdOfLight(lightSource)
    });
};