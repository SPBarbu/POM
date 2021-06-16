/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

// if (typeof String.prototype.parseFunction != 'function') {
//     String.prototype.parseFunction = function () {
//         var funcReg = /function *([^()]*) *\(([^()]*)\)[ \n\t]*{(.*)}/gim;
//         var match = funcReg.exec(this.replace(/\n/g, ' '));

//         if(match) {
//         	//match[1] // function name
//         	//match[2] // parameters
//         	//match[3] // functions
//         	eval("var func = function "+match[1]+"("+match[2].split(',')+"){"+ match[3]+"};");
//         	// var func = new Function(match[2].split(','), match[3]);
//         	func.name = match[1];
//             return func
//         }

//         return null;
//     };
// }

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}

var LogLevel 	= {};
var TraceLog	= LogLevel.TraceLog		= 0;
var InfoLog 	= LogLevel.InfoLog 		= 1;
var WarningLog 	= LogLevel.WarningLog 	= 2;
var ErrorLog 	= LogLevel.ErrorLog 	= 3;

function levelLog(message, level){
	if (level >= WarningLog) {
		console.log(message);
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype);
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:" + Class);
		}
		pt.constructor = Class;
	}
}

var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {};
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);

// Temporal search related
var DOMParser = require('./dom-parser').DOMParser;

function DOMException(code, message) {
	var error;
	if(message instanceof Error){
		error = message;
	}
	else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
}

DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException);

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented.
 * NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
}

NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0,
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
	 */
	item:function(index) {
		return this[index] || null;
	}
};

function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}

function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		// levelLog(ls.length);
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}

LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
};

_extends(LiveNodeList,NodeList);

/**
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow
 * convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 */
function NamedNodeMap() {
}

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i;}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}

function _removeNamedNode(el,list,attr){
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1;
		while(i<lastIndex) {
			list[i] = list[++i];
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}
	else{
		throw DOMException(NOT_FOUND_ERR,new Error());
	}
}

NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem:function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		var i = this.length;
		while(i--){
			var attr = this[i];
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem:function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS:function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem:function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;


	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS:function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};

/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
}

DOMImplementation.prototype = {
	hasFeature:function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		doc.implementation = this;
		doc.childNodes = new NodeList();
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;

		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};

// Event Exceptions
var EventException = {};
var UNSPECIFIED_EVENT_TYPE_ERR  = EventException.UNSPECIFIED_EVENT_TYPE_ERR     = ((ExceptionMessage[0] = 'Unspecified event type'), 0);
var UNINITIALIZED_EVENT         = EventException.UNINIITIALZED_EVENT            = ((ExceptionMessage[1] = 'Uninitialized event'), 1);
var EVENT_TYPE_MISMATCH         = EventException.EVENT_TYPE_MISMATCH            = ((ExceptionMessage[2] = 'Event type mismatch'), 2);

function Event() {
}

// Event Phases
Object.defineProperty(Event, "CAPTURING_PHASE", { value : 1 });
Object.defineProperty(Event, "AT_TARGET",       { value : 2 });
Object.defineProperty(Event, "BUBBLING_PHASE",  { value : 3 });

Event.prototype = {
    type : null,
    target : null,
    currentTarget : null,
    eventPhase : null,
    bubbles : null,
    cancelable : null,
    timeStamp : null,
    propagate : true, // from here, not seen in DOM level 2 IDL def
    intialized : false,
    dispatched : false,
    action : true,

    stopPropagation:function(){
        this.propagate = false;
    },

    preventDefault:function(){
        if (cancelable)
			this.action = false;
    },

    initEvent:function(eventType, canBubble, canCancel){
        if (this.dispatched) return;
        this.type = eventType;
        this.bubbles = canBubble;
        this.cancelable = canCancel;
        this.initialized = true;
    },

    setDefaultAction:function(action) {
        if (!(action && getClass.call(object) == '[object Function]'))
			return;
        this. defaultAction = action;
    },

    defaultAction:function(){}
};

function MutationEvent() {
}

Object.defineProperty(MutationEvent, "SUBTREE_MODIFIED",        { value : 0 });
Object.defineProperty(MutationEvent, "ELEMENT_INSERTED",        { value : 1 });
Object.defineProperty(MutationEvent, "ELEMENT_REMOVED",         { value : 2 });
Object.defineProperty(MutationEvent, "ATTR_MODIFIED",			{ value : 3 });
Object.defineProperty(MutationEvent, "CHARACTER_DATA_MODIFIED",	{ value : 4 });

// Attr Change Types
Object.defineProperty(MutationEvent, "MODIFICATION",    { value : 1 });
Object.defineProperty(MutationEvent, "ADDITION",        { value : 2 });
Object.defineProperty(MutationEvent, "REMOVAL",         { value : 3 });

MutationEvent.prototype = {
    relatedNode : null,
    prevValue : null,
    newValue : null,
    attrName : null,
    attrChange : null,

    initMutationEvent:function(type, canBubble, canCancel, relatedNode, prevValue, newValue, attrName, attrChange) {
        if (this.dispatched) return;
        this.type = type;
        this.bubbles = canBubble;
        this.cancelable = canCancel;
        this.relatedNode = relatedNode;
        this.prevValue = prevValue;
        this.newValue = newValue;
        this.attrName = attrName;
        this.attrChange = attrChange;
        this.initialized = true;
    }
};
_extends(MutationEvent,Event);

function SearchEvent() {
}

// Search Event Types
Object.defineProperty(SearchEvent, "SERVICE_REQUEST", { value : 7 });
Object.defineProperty(SearchEvent, "SERVICE_LOCATED", { value : 8 });

SearchEvent.prototype = {
    query : null,
    callback : null,

    initSearchEvent:function(type, canBubble, canCancel, query, callback) {
        if (this.dispatched) return;
        this.type = type;
        this.bubbles = canBubble;
        this.cancelable = canCancel;
        this.query = query;
        this.callback = callback;
        this.initialized = true;
    }
};
_extends(SearchEvent,Event);

function RegistrationEvent() {
}

// Registration Event Types
Object.defineProperty(RegistrationEvent, "DEVICE_REGISTERED", 	{ value : 5 });
Object.defineProperty(RegistrationEvent, "DEVICE_UNREGISTERED",	{ value : 6 });

RegistrationEvent.prototype = {
    deviceID : null,
    deviceType : null,
    deviceLoc : null,

    initRegistrationEvent:function(type, canBubble, canCancel, deviceID, deviceType, deviceLoc) {
        if (this.dispatched) return;
        this.type = type;
        this.bubbles = canBubble;
        this.cancelable = canCancel;
        this.deviceID = deviceID;
        this.deviceType = deviceType;
        this.deviceLoc = deviceLoc;
        this.initialized = true;
    }
};
_extends(RegistrationEvent,Event);

function DocumentEvent() {
}

// Document Event Types
Object.defineProperty(DocumentEvent, "CUSTOM_EVENT",    	{ value : 1 });
Object.defineProperty(DocumentEvent, "MUTATION_EVENT",  	{ value : 2 });
Object.defineProperty(DocumentEvent, "SEARCH_EVENT",    	{ value : 3 });
Object.defineProperty(DocumentEvent, "REGISTRATION_EVENT",  { value : 4 });

DocumentEvent.prototype = {
    createEvent:function(eventType) {
        var evt;
        switch (eventType) {
            case DocumentEvent.CUSTOM_EVENT:    	evt = new Event();          	break;
            case DocumentEvent.MUTATION_EVENT:  	evt = new MutationEvent();  	break;
            case DocumentEvent.SEARCH_EVENT:    	evt = new SearchEvent();    	break;
            case DocumentEvent.REGISTRATION_EVENT: 	evt = new RegistrationEvent();  break;
            default: 								throw EventException.UNSPECIFIED_EVENT_TYPE_ERR;
        }
        evt.timeStamp = new Date().getTime();
        return evt;
    }
};

function EventListener() {
}

EventListener.prototype = {
    handleEvent:function(evt, node) {}
};

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
}

function _buildPath(node) {
    var path;

    if (!node.parentNode)
    	path = [];
    else
    	path = _buildPath(node.parentNode);
    path.push(node);
    return path;
}

function _notify(evt) {
    var evls = evt.currentTarget.eventListeners,
        len = evls ? evls.length : 0,
        listener;
    for (var i = 0; i < len; i++) {
        if (evls[i].type === evt.type) {
            if ((!evls[i].useCapture && evt.eventPhase === Event.CAPTURING_PHASE)||
            	(evls[i].useCapture && evt.eventPhase === Event.BUBBLING_PHASE)) continue;
			listener = evls[i].listener;

			if (evt.type !== SearchEvent.SERVICE_REQUEST) {
				listener.handleEvent(evt);
				continue;
			}
			if (evt.query === 'all' || evt.query === listener.service)
				listener.handleEvent(evt, listener.service, listener.controlID);
        }
    }
}

Node.prototype = {
	firstChild     : null,
	lastChild      : null,
	previousSibling: null,
	nextSibling    : null,
	attributes     : null,
	parentNode     : null,
	childNodes     : null,
	ownerDocument  : null,
	nodeValue      : null,
	namespaceURI   : null,
	prefix         : null,
	localName      : null,
	eventListeners : null,
	// Database for Temporal Search
	LogDB          : null,
	LogCollection  : null,
	LogStartTime   : null,
	SnapCollection : null,
	TemporalNode   : null,
	LogFunctions   : null,

	// Customized for Temporal Search
	constructTemporalToTime:function(timestamp, callback) {
		var DOMParser = require('./dom-parser').DOMParser,
			node = this.TemporalNode,
			logFunctions = this.LogFunctions,
			logCount = 0;
		levelLog("Starting to construct Temporal", InfoLog);
		if (!this.LogCollection) {
			levelLog('No LogCollection found', WarningLog);
			return;
		}
		levelLog("time is "+timestamp, InfoLog);
		var stream = this.LogCollection.find({"Timestamp":{$lt:timestamp}}).sort({"Timestamp":1}).stream();
	    stream.on("data", function(item) {
			levelLog("Time:" + item.Timestamp + "Found Action: " + item.ActionName + " On Device: " + item.DeviceID + " On Node: " + item.NodeID , InfoLog);
			logCount++;
			var actionNode = node.getElementById(item.DeviceID).getElementById(item.NodeID);
			switch (item.ActionName) {
				case 'appendChild':
					var childNode = new DOMParser().parseFromString(item.ActionInfo.NodeString, 'text/xml');
					childNode = childNode.childNodes[0];
					if(item.ActionInfo.NodeType != childNode.nodeType){
						levelLog("NodeType not match Constructed:"+childNode.nodeType+" Logged:"+item.ActionInto.nodeType , WarningLog);
					}
					actionNode.appendChild(childNode);
					levelLog('\nNodeString:\n'+item.ActionInfo.NodeString.toString(), TraceLog);
					break;
				case 'removeChild':
					var childNode = actionNode.getElementById(item.ActionInfo.NodeID);
					actionNode.removeChild(childNode);
					levelLog('\nNodeID:\n'+item.ActionInfo.NodeID, TraceLog);
					break;
				case 'createElement':
					actionNode.createElement(item.ActionInfo.Element);
					levelLog('\nelement:\n'+item.ActionInfo.Element, TraceLog);
					break;
				case 'createTextNode':
					actionNode.createTextNode(item.ActionInfo.Text);
					levelLog('\ntext:\n'+item.ActionInfo.Text, TraceLog);
					break;
				case 'setAttribute':
					actionNode.setAttribute(item.ActionInfo.Name, item.ActionInfo.Value);
					levelLog('\nname:\n'+item.ActionInfo.Name+'\nvalue:\n'+item.ActionInfo.Value, TraceLog);
					break;
				case 'removeAttribute':
					actionNode.removeAttribute(item.ActionInfo.Name);
					levelLog('\nname:\n'+item.ActionInfo.Name, TraceLog);
					break;
				case 'replaceData':
					var i = actionNode.childNodes.length - 1;
					for (; i >= 0; i--) {
						if (actionNode.childNodes[i].nodeType === TEXT_NODE) {
							break;
						};
					};
					if (i >= 0) {
						actionNode.childNodes[i].replaceData(item.ActionInfo.Offset, item.ActionInfo.Count, item.ActionInfo.Text);
						levelLog('\noffset:\n'+item.ActionInfo.Offset+'\ncount:\n'+item.ActionInfo.Count+'\ntext:\n'+item.ActionInfo.Text, TraceLog);
					} else{
						levelLog('Cannot find text node in node '+actionNode.getAttribute('id'), ErrorLog);
					};
					break;
				case 'addEventListener':
					var listenerNode = node.getElementById(item.ActionInfo.ListenerID);
					var handlerName = item.ActionInfo.HandleEvent;
					var listener = {
						'node' : listenerNode,
						'handleEvent' : logFunctions[handlerName],
						'service' : item.ActionInfo.Service,
						'controlID' : item.ActionInfo.ControlID
					};
					actionNode.addEventListener(item.ActionInfo.Type, listener, item.ActionInfo.UseCapture);
					levelLog('\ntype:\n'+item.ActionInfo.Type+'\nlistenerNode:\n'+listenerNode.getAttribute('id')+'\nlistenerFunc:\n'+handlerName+'\nuseCapture:\n'+item.ActionInfo.UseCapture, TraceLog);
					break;
				case 'removeEventListener':
					var listenerNode = node.getElementById(item.ActionInfo.ListenerID);
					var handlerName = item.ActionInfo.HandleEvent;
					var listener = {
						'node' : listenerNode,
						'handleEvent' : logFunctions[handlerName],
						'service' : item.ActionInfo.Service,
						'controlID' : item.ActionInfo.ControlID
					};
					actionNode.removeEventListener(item.ActionInfo, listener, item.ActionInfo.UseCapture);
					levelLog('\ntype:\n'+item.ActionInfo+'\nlistenerNode:\n'+listenerNode.getAttribute('id')+'\nlistenerFunc:\n'+handlerName+'\nuseCapture:\n'+item.ActionInfo.UseCapture, TraceLog);
					break;
				default:
					levelLog('Error: Unsupported Action', ErrorLog);
			}

	    });
	    stream.on("end", function() {
			levelLog("Done constructing TemporalNode", InfoLog);
			callback(null, "Temporal time set:"+timestamp, logCount);

	    });

	},
	createTemporal:function(xmlString, startTime, stopTime, callback) {
		var DOMParser = require('./dom-parser').DOMParser;
		levelLog("start parser", InfoLog);
		// Future improvement: check if Temporal can be done based on existing temporal
		this.TemporalNode = new DOMParser().parseFromString(xmlString, 'text/xml');
		this.constructTemporalToTime(stopTime, callback);
	},
	setTemporalTime:function(timestamp, callback) {
		var currentTime,
			node;

		// If no timestamp present, means want to stop the temporal instance
		if (!timestamp || timestamp == "(null)") {
			levelLog("No timestamp, dropping temporal instance", InfoLog);
			this.TemporalNode = null;
			callback(null, "Success: Temporal instance terminated");
			return;
		}

        levelLog('Notification: Start Temporal search at '+timestamp, InfoLog);
        currentTime = new Date().getTime();
        if (timestamp > currentTime) {
        	callback("Warning: CurrentTime:"+currentTime);
        	return;
        }
		node = this;
		if (this.SnapCollection) {
			// Future Improvement: Should find the closest snapshot prior to search time
			this.SnapCollection.findOne({}, function(err, item) {
				if (err) {
					callback(err);
					return;
				}
				levelLog("found snapshot at "+item.Timestamp, InfoLog);
				if (timestamp < item.Timestamp) {
					callback("Warning: StartTime:"+item.Timestamp);
					return;
				} else {
					node.createTemporal(item.Snapshot, item.Timestamp, Number(timestamp), callback);
					// callback(null, "Temporal time set:"+timestamp);
				}
			});
		}
	},
	checkSnapshot:function(error, result){
		if (error) {
			levelLog(error, ErrorLog);
		}else if(result) {
			levelLog(result, InfoLog);
		}else{
			levelLog("Snapshote saved to database", InfoLog);
		}
	},
	takeSnapshot:function() {
		if(this.SnapCollection) {
			var timestamp = new Date().getTime();
			var entry = {
				Timestamp : timestamp,
				Snapshot  : this.toString()
			};
			this.SnapCollection.insert(entry, {w:1}, this.checkSnapshot());
		}
	},
	startLogging:function() {
		var node = this;
	 	var MongoClient = require('mongodb').MongoClient;
	 	MongoClient.connect("mongodb://localhost:27017/LogDB", function(err, db) {
	 		if (err) {
	 			levelLog("Failed: connect to 'LogDB'", ErrorLog);
	 			return console.dir(err);
	 		} else {
	 			levelLog("Connected to 'LogDB'", InfoLog);
				node.LogDB = db;
				node.LogStartTime = new Date().getTime();
	 			db.createCollection('logCollection_'+node.LogStartTime, function(err, collection){
	 				if (err) {
	 					levelLog("Failed: createCollection 'logCollection_"+node.LogStartTime+"'", ErrorLog);
	 				}else{
	 					levelLog("Created/Found Collection 'logCollection_"+node.LogStartTime+"'", InfoLog);
						// collection.remove({},function(err, number){levelLog("  removed "+number+" documents.")});
	 					node.LogCollection = collection;
	 					node.LogFunctions = new Array();
	 				}
	 			});
				db.createCollection('snapshotCollection_'+node.LogStartTime, function(err, collection){
					if (err) {
						levelLog("Failed: createCollection 'snapshotCollection_"+node.LogStartTime+"'", ErrorLog);
					}else{
						levelLog("Created/Found Collection 'snapshotCollection_"+node.LogStartTime+"'", InfoLog);
						// collection.remove({},function(err, number){levelLog("  removed "+number+" documents.")});
						node.SnapCollection = collection;
						node.takeSnapshot();
					}
				});
	 		}
	 	});
 	},
 	checkLogging:function(error, result){
		if (error) {
			levelLog(error, ErrorLog);
		}else if(result) {
			levelLog(result, InfoLog);
		}else{
			levelLog("Logged to database", InfoLog);
		}
	},
 	logToDB:function(actionName, actionInfo, actionInfo2, actionInfo3){
 		var parent = this;
 		var deviceID;
 		var logCollection;
		var logFunctions;
 		// this.ownerDocument not always finds the correct document, so iterate to find.
		while(parent){
			if (!deviceID) {
				// No device ID, should get the closest device id
				if (parent.nodeName == 'device') {
					deviceID = parent.getAttribute('id');
					levelLog("found deviceID: "+deviceID, TraceLog);
				}
			}
			if (logCollection = parent.LogCollection) {
				// Find the parent document
				logFunctions = parent.LogFunctions;
				break;
			}
			parent = parent.parentNode;
		}
		if (!deviceID) {
			// No device ID, but found logCollection, normally means creating new node for docuemnt
			levelLog("Warning: no deviceID", TraceLog);
			return;
		} else {
			levelLog("Info: deviceID is "+deviceID, TraceLog);
		}
		if (logCollection) {
			levelLog("LogToDB: ActionName\n"+actionName+'\nactionInfo:\n'+actionInfo+'\nactionInfo2:\n'+actionInfo2+'\nactionInfo3:\n'+actionInfo3, InfoLog);

			// LogCollection on the root Document exist, can log
			var nodeID;
			if (this.LogCollection){
				// This is the Root Document node
				var rootDevice = this.childNodes[1];
				if (rootDevice.nodeName == "device"){
					nodeID = rootDevice.getAttribute('id');
				}else {
					levelLog("Error: Server POM doesn't start with device node.", ErrorLog);
					throw("Error: Server POM doesn't start with device node.");
				}
			}else {
				try{
					nodeID = this.getAttribute('id');
				}catch(err){
					// node doesn't have getAttribute method, normally is TextNode
					nodeID = this.parentNode.getAttribute('id');
				}
			}


			// appendChild        : deviceID nodeID actionInfo(newNode).toString()
			// removeChild        : deviceID nodeID actionInfo(oldNode).getAttribute('id')
			// createElement      : deviceID nodeID actionInfo(tagName)
			// createTextNode     : deviceID nodeID actionInfo(dataText)
			// setAttribute       : deviceID nodeID actionInfo(name) 	actionInfo2(value)
			// removeAttribute    : deviceID nodeID actionInfo(name)
			// replaceData        : deviceID nodeID actionInfo(offset) 	actionInfo2(count) 		actionInfo3(text)
			// addEventListener   : deviceID nodeID actionInfo(type) 	actionInfo2(listener) 	actionInfo3(useCapture)
			// removeEventListener: deviceID nodeID actionInfo(type) 	actionInfo2(listener) 	actionInfo3(useCapture)

			levelLog("nodeID= "+nodeID, TraceLog);
			var entry;
			var timestamp = new Date().getTime();
			switch (actionName) {
				case 'appendChild':
					levelLog('\nNodeString:\n'+actionInfo.toString(), TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName: actionName,
						DeviceID  : deviceID,
						NodeID    : nodeID,
						ActionInfo: {
							NodeString: actionInfo.toString(),
							NodeType  : actionInfo.nodeType
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'removeChild':
					levelLog('\nNodeID:\n'+actionInfo.getAttribute('id'), TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName: actionName,
						DeviceID  : deviceID,
						NodeID    : nodeID,
						ActionInfo: {
							NodeID : actionInfo.getAttribute('id')
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'createElement':
					levelLog('\nelement:\n'+actionInfo, TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName: actionName,
						DeviceID  : deviceID,
						NodeID    : nodeID,
						ActionInfo: {
							Element : actionInfo
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'createTextNode':
					levelLog('\ntext:\n'+actionInfo, TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName: actionName,
						DeviceID  : deviceID,
						NodeID    : nodeID,
						ActionInfo: {
							Text : actionInfo
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'setAttribute':
					levelLog('\nname:\n'+actionInfo+'\nvalue:\n'+actionInfo2, TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName : actionName,
						DeviceID   : deviceID,
						NodeID     : nodeID,
						ActionInfo : {
							Name : actionInfo,
							Value: actionInfo2
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'removeAttribute':
					levelLog('\nname:\n'+actionInfo, TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName : actionName,
						DeviceID   : deviceID,
						NodeID     : nodeID,
						ActionInfo : {
							Name : actionInfo
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
				case 'replaceData':
					levelLog('\noffset:\n'+actionInfo+'\ncount:\n'+actionInfo2+'\ntext:\n'+actionInfo3, TraceLog);
					entry = {
						Timestamp : timestamp,
						ActionName : actionName,
						DeviceID   : deviceID,
						NodeID     : nodeID,
						ActionInfo : {
							Offset: actionInfo,
							Count : actionInfo2,
							Text  : actionInfo3
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'addEventListener':
					levelLog('\ntype:\n'+actionInfo+'\nlistenerNode:\n'+actionInfo2.node.getAttribute('id')+'\nlistenerFunc:\n'+actionInfo2.handleEvent.name+'\nuseCapture:\n'+actionInfo3, TraceLog);
					var handler = actionInfo2.handleEvent;
					if (logFunctions && logFunctions[handler.name]) {
						//Function name already exist, potential conflict or duplicate
						//Since closure captures local variables, so need to save all version of functions
						if (logFunctions[handler.name] === handler) {
							levelLog("function absolutely same", InfoLog);
							//This case should be fine, maybe same clients add more listeners with same function
						} else {
							levelLog("function not the same", InfoLog);
							//Should rename function and save it
						}
					} else{
						logFunctions[handler.name] = handler;
					}
					entry = {
						Timestamp : timestamp,
						ActionName : actionName,
						DeviceID   : deviceID,
						NodeID     : nodeID,
						ActionInfo : {
							Type      : actionInfo,
							ListenerID: actionInfo2.node.getAttribute('id'),
							HandleEvent : handler.name,
							Service   : actionInfo2.service,
							ControlID : actionInfo2.controlID,
							UseCapture: actionInfo3
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				case 'removeEventListener':
					levelLog('\ntype:\n'+actionInfo+'\nlistenerNode:\n'+actionInfo2.node.getAttribute('id')+'\nlistenerFunc:\n'+actionInfo2.handleEvent.name+'\nuseCapture:\n'+actionInfo3, InfoLog);
					var handler = actionInfo2.handleEvent;
					// if (logFunctions && logFunctions[handler.name]) {
					// 	//Function name already exist, potential conflict or duplicate
					// } else{
					// 	logFunctions[handler.name] = handler;
					// };
					entry = {
						Timestamp : timestamp,
						ActionName : actionName,
						DeviceID   : deviceID,
						NodeID     : nodeID,
						ActionInfo : {
							Type      : actionInfo,
							ListenerID: actionInfo2.node.getAttribute('id'),
							HandleEvent : handler.name,
							Service   : actionInfo2.service,
							ControlID : actionInfo2.controlID,
							UseCapture: actionInfo3
						}
					};
					logCollection.insert(entry, {w:1}, this.checkLogging());
					break;
				default:
					levelLog('Error: Unsupported Action: '+actionName, ErrorLog);
			}
		}
	},
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		this.logToDB('removeChild', oldChild);
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		this.logToDB('appendChild', newChild);
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild !== null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}
			else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length > 0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == 2?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == 2?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix === null;
    },

    // DOM Level 2 EventTarget Interface
    addEventListener:function(type, listener, useCapture){
        var newEvl,
        index;
        if (!this.eventListeners) this.eventListeners = [];
        for (index = 0; index < this.eventListeners.length; index++) {
             evl = this.eventListeners[index];
            if (evl.type === type &&
                evl.listener === listener &&
                evl.useCapture === useCapture)
                    return;
        }
        newEvl = { "type": type, "listener" : listener, "useCapture" : useCapture};
        this.eventListeners.push(newEvl);
        this.logToDB('addEventListener', type, listener, useCapture);
    },

    removeEventListener:function(type, listener, useCapture){
        var index;
        if (!this.eventListeners) return;
        for (index = 0; index < this.eventListeners.length; index++) {
            evl = this.eventListeners[index];
            if (evl.type === type &&
                evl.listener === listener &&
                evl.useCapture === useCapture)  {
                    this.eventListeners.splice(index, 1);
					this.logToDB('removeEventListener', type, listener, useCapture);
                    break;
            }
        }
    },

    dispatchEvent:function(evt){
        var path = _buildPath(this),
            index = 0;

        if (!evt.initialized)
        	throw EventException.UNINITIALIZED_EVENT;

        evt.dispatched = true;
        evt.target = this;
        evt.eventPhase = Event.CAPTURING_PHASE;
        evt.currentTarget = path[index];

        while (evt.currentTarget !== evt.target) {
            _notify(evt);
            if (!evt.propagate) return;
            index++;
            evt.currentTarget = path[index];
        }
        evt.eventPhase = Event.AT_TARGET;
        _notify(evt);

        if (evt.bubbles && evt.propagate) {
            evt.eventPhase = Event.BUBBLING_PHASE;
            index--;
            while (index >= 0) {
                evt.currentTarget = path[index];
                _notify(evt);
                if (!evt.propagate) return;
                index--;
            }
        }
        if (evt.action) evt.defaultAction();
    }
};

function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';';
}

copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true;}
        }
        while(node=node.nextSibling);
    }
}

function Document(){
}

function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix ? newAttr.localName:''] = newAttr.value;
	}
}

function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:''];
	}
}

function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//levelLog(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 *
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next;
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}

/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode,
		newFirst,
		newLast;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		newFirst = newChild.firstChild;
		if (newFirst === null) {
			return newChild;
		}
		newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;


	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild === null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//levelLog(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}

function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//levelLog("__aa",parentNode.lastChild.nextSibling == null)
}

Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,

	insertBefore:function(newChild, refChild){//raises
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement === null && newChild.nodeType == 1){
			this.documentElement = newChild;
		}

		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild:function(oldChild){
		this.logToDB('removeChild', oldChild);
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode:function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById:function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == 1){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		});
		return rtv;
	},

	//document factory method:
	createElement:function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		this.logToDB('createElement', tagName);
		return node;
	},
	createDocumentFragment:function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode:function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data);
		this.logToDB('createTextNode', data);
		return node;
	},
	createComment:function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createCDATASection:function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data);
		return node;
	},
	createProcessingInstruction:function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute:function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference:function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS:function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS:function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};

_extends(Document,Node);

function Element() {
	this._nsMap = {};
}

Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute:function(name){
		return this.getAttributeNode(name)!==null;
	},
	getAttribute:function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode:function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute:function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr);
		this.logToDB('setAttribute', name, value);
	},
	removeAttribute:function(name){
		var attr = this.getAttributeNode(name);
		attr && this.removeAttributeNode(attr);
		this.logToDB('removeAttribute', name);

	},

	//four real opeartion method
	appendChild:function(newChild){
		this.logToDB('appendChild', newChild);
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode:function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS:function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode:function(oldAttr){
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS:function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS:function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!==null;
	},
	getAttributeNS:function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS:function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = value;
		this.setAttributeNode(attr);
	},
	getAttributeNodeNS:function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	getElementsByTagName:function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS:function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && node.namespaceURI === namespaceURI && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	// NEW - Added specifically for POM
    getElementById:function(id){
        var rtv = null;
        _visitNode(this,function(node){
            if(node.nodeType == 1){
                if(node.getAttribute('id') == id){
                    rtv = node;
                    return true;
                }
            }
        });
        return rtv;
    }
};

Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

_extends(Element,Node);

function Attr() {
}

Attr.prototype = {
    nodeType : ATTRIBUTE_NODE,
    getOwnerElement:function(){
        return this.ownerElement;
    }
};
_extends(Attr,Node);

function CharacterData() {
}

CharacterData.prototype = {
	data : '',
	substringData:function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData:function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData:function(offset,text) {
		this.replaceData(offset,0,text);

	},
	appendChild:function(newChild){
		//if(!(newChild instanceof CharacterData)){
			throw new Error(ExceptionMessage[3]);
		//}
		return Node.prototype.appendChild.apply(this,arguments);
	},
	deleteData:function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData:function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
		this.logToDB('replaceData', offset, count, text);
	}
};

_extends(CharacterData,Node);

function Text() {
}

Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText:function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
};

_extends(Text,CharacterData);

function Comment() {
}

Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
};
_extends(Comment,CharacterData);

function CDATASection() {
}

CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
};
_extends(CDATASection,CharacterData);


function DocumentType() {
}

DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
}

Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
}

Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
}

EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
}

DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);

function ProcessingInstruction() {
}

ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);

function XMLSerializer(){};

XMLSerializer.prototype.serializeToString = function(node){
	var buf = [];
	serializeToString(node,buf);
	return buf.join('');
};

Node.prototype.toString =function(){
	return XMLSerializer.prototype.serializeToString(this);
};

function serializeToString(node,buf){
	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		var isHTML = htmlns === node.namespaceURI;
		buf.push('<',nodeName);
		for(var i=0;i<len;i++){
			serializeToString(attrs.item(i),buf,isHTML);
		}
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				if(child){
					buf.push(child.data);
				}
			}else{
				while(child){
					serializeToString(child,buf);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}

function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
		break;
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};

function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length;
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value;
}

//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case 1:
				case 11:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = value;
					this.nodeValue = data;
				}
			}
		});

		function getTextContent(node){
			switch(node.nodeType){
			case 1:
			case 11:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}
		__set__ = function(object,key,value){
			//levelLog(value)
			object['$$'+key] = value;
		};
	}
}catch(e){//ie8
}

if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
	exports.DocumentEvent = DocumentEvent;
}
