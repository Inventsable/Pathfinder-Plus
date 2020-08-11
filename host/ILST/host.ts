console.log("Host is online");

function executeAction(name, opts) {
  let opts = JSON.parse(opts),
    selection = [];
  if (opts.combSelection)
    selection = get("pageItems")
      .filter((item) => {
        return !item.selected;
      })
      .map((item) => {
        return item.uuid;
      });
  runAction(name);
  if (opts.combSelection) selectInverse(selection);
  else app.selection = null;
}

function getBoundingBoxOfSelection() {
  let selection = get("selection");
  let x1 = selection.map((item) => item.visibleBounds[0]).min();
  let x2 = selection.map((item) => item.visibleBounds[2]).max();
  let y1 = selection.map((item) => item.visibleBounds[1]).max();
  let y2 = selection.map((item) => item.visibleBounds[3]).min();
  return [x1, y1, x2, y2];
}

function selectInverse(items) {
  get("pageItems")
    .filter((item) => {
      return !items.includes(item.uuid);
    })
    .forEach((item) => {
      item.selected = true;
    });
}

function runAction(name) {
  let action = getActionByName(name);
  var tmp = File(Folder.desktop + "/temp.aia");
  tmp.open("w");
  tmp.write(action);
  tmp.close();
  app.loadAction(tmp);
  app.doScript(name, "Live-Pathfinder", false);
  tmp.remove();
  app.unloadAction("Live-Pathfinder", "");
}

function getActionByName(name) {
  if (name == "unite")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 5" +
      "		756e697465" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 1" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 3" +
      "				416464" +
      "			]" +
      "			/value 0" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "unite-alt")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 9" +
      "		756e6974652d616c74" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_compound_shape)" +
      "		/localizedName [ 14" +
      "			436f6d706f756e64205368617065" +
      "		]" +
      "		/isOpen 1" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 2" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 3" +
      "				416464" +
      "			]" +
      "			/value 0" +
      "		}" +
      "		/parameter-2 {" +
      "			/key 1836016741" +
      "			/showInPalette -1" +
      "			/type (integer)" +
      "			/value 0" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "minus front")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 11" +
      "		6d696e75732066726f6e74" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 8" +
      "				5375627472616374" +
      "			]" +
      "			/value 3" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "minus front-alt")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 15" +
      "		6d696e75732066726f6e742d616c74" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_compound_shape)" +
      "		/localizedName [ 14" +
      "			436f6d706f756e64205368617065" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 2" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 8" +
      "				5375627472616374" +
      "			]" +
      "			/value 3" +
      "		}" +
      "		/parameter-2 {" +
      "			/key 1836016741" +
      "			/showInPalette -1" +
      "			/type (integer)" +
      "			/value 0" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "intersect")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 9" +
      "		696e74657273656374" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 9" +
      "				496e74657273656374" +
      "			]" +
      "			/value 1" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "intersect-alt")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 13" +
      "		696e746572736563742d616c74" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_compound_shape)" +
      "		/localizedName [ 14" +
      "			436f6d706f756e64205368617065" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 2" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 9" +
      "				496e74657273656374" +
      "			]" +
      "			/value 1" +
      "		}" +
      "		/parameter-2 {" +
      "			/key 1836016741" +
      "			/showInPalette -1" +
      "			/type (integer)" +
      "			/value 0" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "exclude")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 7" +
      "		6578636c756465" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 7" +
      "				4578636c756465" +
      "			]" +
      "			/value 2" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "exclude-alt")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 11" +
      "		6578636c7564652d616c74" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_compound_shape)" +
      "		/localizedName [ 14" +
      "			436f6d706f756e64205368617065" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 2" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 7" +
      "				4578636c756465" +
      "			]" +
      "			/value 2" +
      "		}" +
      "		/parameter-2 {" +
      "			/key 1836016741" +
      "			/showInPalette -1" +
      "			/type (integer)" +
      "			/value 0" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "divide")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 6" +
      "		646976696465" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 6" +
      "				446976696465" +
      "			]" +
      "			/value 5" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "trim")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 4" +
      "		7472696d" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 4" +
      "				5472696d" +
      "			]" +
      "			/value 7" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "merge")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 5" +
      "		6d65726765" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 5" +
      "				4d65726765" +
      "			]" +
      "			/value 8" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "crop")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 4" +
      "		63726f70" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 4" +
      "				43726f70" +
      "			]" +
      "			/value 9" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "outline")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 7" +
      "		6f75746c696e65" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 7" +
      "				4f75746c696e65" +
      "			]" +
      "			/value 6" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "minus back")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 10" +
      "		6d696e7573206261636b" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_pathfinder)" +
      "		/localizedName [ 10" +
      "			5061746866696e646572" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1851878757" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 10" +
      "				4d696e7573204261636b" +
      "			]" +
      "			/value 4" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "clipping mask")
    return (
      "/version 3" +
      "/name [ 15" +
      "	4c6976652d5061746866696e646572" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 13" +
      "		636c697070696e67206d61736b" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 1" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (adobe_makeMask)" +
      "		/localizedName [ 18" +
      "			4d616b6520436c697070696e67204d61736b" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 0" +
      "	}" +
      "}" +
      ""
    );
}

// function createNewDocAndExport() {
//   app.executeMenuCommand("copy");
//   let lastDoc = app.activeDocument;
//   let newDoc = app.documents.add();
//   app.activeDocument = newDoc;
//   app.executeMenuCommand("pasteFront");
//   app.activeDocument.artboards[0].artboardRect = getBoundingBoxOfSelection();
//   exportSVG(path);
//   // newDoc.remove();
//   // alert("Done");
// }

// function test(path) {
//   let artboards = app.activeDocument.artboards;
//   let activeIndex = artboards.getActiveArtboardIndex();
//   let bbox = getBoundingBoxOfSelection();
//   let newAB = artboards.add(bbox);
//   artboards.setActiveArtboardIndex(artboards.length - 1);
//   exportSVG(path);
//   newAB.remove();
//   artboards.setActiveArtboardIndex(activeIndex);
// }

// function setOptionsForSVGExport() {
//   var options = new ExportOptionsWebOptimizedSVG();
//   options.coordinatePrecision = 2;
//   options.fontType = SVGFontType.OUTLINEFONT;
//   options.svgId = SVGIdType.SVGIDREGULAR;
//   options.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS;
//   return options;
// }

// function exportSVG(path) {
//   app.activeDocument.exportFile(
//     new File(path),
//     ExportType.WOSVG,
//     setOptionsForSVGExport()
//   );
// }

// function exportSVG(doc, name, bounds, exportOptions) {
//   doc.artboards[0].artboardRect = bounds;

//   var file = new File(exportFolder.fsName + "/" + name);
//   doc.exportFile(file, ExportType.SVG, exportOptions);
// }

console.log("Host is fully loaded");
