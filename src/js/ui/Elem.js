//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * ...
 *
 * @constructor
 *
 * @class Elem
 * @classdesc
 *
 * @since 1.0
 * @author Agnes Vidal <agnes.ct.vidal@gmail.com>
 * @copyright Copyright (c) 2019.
 * @license Creative Commons (BY-NC-SA)
 */
var Elem = {
    /**
     * Creates new element.
     *
     * @param type {string}
     * @returns {Element}
     */
    createElem : function (type) {
    return document.createElement(type);
    },

    /**
     * Creates new element with class-attribute.
     *
     * @param type {string}
     * @param classname {string}
     * @returns {Element}
     */
    createClassElem : function (type, classname) {
        var element = document.createElement(type);
        if (classname !== undefined) {
            element.setAttribute("class", classname);
        }
        return element;
    },

    /**
     * Creates new element with id-attribute.
     *
     * @param type {string}
     * @param id {string}
     * @returns {Element}
     */
    createIdElem : function (type, id) {
        var element = document.createElement(type);
        if (id !== undefined) {
            element.setAttribute("id", id);
        }
        return element;
    },

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {Element}
     * @param type {string}
     * @returns {Element}
     */
    appendNewElem : function (parent, type) {
        var element = Elem.createElem(type);
        parent.appendChild(element);
        return element;
    },

    /**
     * Creates new element and appends to parent element at a position.
     *
     * @param parent {Element}
     * @param type {string}
     * @param pos {Number}
     * @returns {Element}
     */
    appendNewElemAt : function (parent, type, pos) {
        var element = Elem.createElem(type);
        this.appendElemAt(parent, element, pos);
        return element;
    },

    /**
     * Creates new class element and appends to parent element at a position.
     *
     * @param parent {Element}
     * @param type {string}
     * @param classname {string}
     * @param pos {Number}
     * @returns {Element}
     */
    appendNewClassElemAt : function (parent, type, classname, pos) {
        var element = this.createClassElem(type, classname);
        this.appendElemAt(parent, element, pos);
        return element;
    },


    /**
     * Appends element to parent element at a position.
     *
     * @param parent {Element}
     * @param elem {Element}
     * @param pos {Number}
     * @returns {Element}
     */
    appendElemAt : function (parent, elem, pos) {
        parent.insertBefore(elem, parent.children[pos]);
    },

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {Element}
     * @param type {string}
     * @param classname {string}
     * @returns {Element}
     */

    appendNewClassElem : function (parent, type, classname) {
        var element = Elem.createClassElem(type, classname);
        parent.appendChild(element);
        return element;
    },

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {Element}
     * @param type {string}
     * @param id {string}
     * @returns {Element}
     */
    appendNewIdElem : function (parent, type, id) {
        var element = Elem.createIdElem(type, id);
        parent.appendChild(element);
        return element;
    },


    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {Element}
     * @param type {string}
     * @returns {Element}
     */
    prependNewElem : function (parent, type) {
        var element = Elem.createElem(type);
        parent.insertBefore(element, parent.firstChild);
        return element;
    },

    prependNewClassElem : function (parent, type, classname) {
        var element = Elem.createClassElem(type, classname);
        parent.insertBefore(element, parent.firstChild);
        return element;
    },

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {Element}
     * @param type {string}
     * @param id {string}
     * @returns {Element}
     */
    prependNewIdElem : function (parent, type, id) {
        var element = Elem.createIdElem(type, id);
        parent.insertBefore(element, parent.firstChild);
        return element;
    },


    /**
     * Creates a new IMG element.
     *
     * @param src
     * @param alt
     * @returns {Element}
     */
    img : function (src, alt) {
        var img = Elem.createElem("img");
        img.setAttribute("src", src);
        img.setAttribute("alt", alt);
        return img;
    },

    /**
     * Creates a new link (a href).
     *
     * @param src
     * @param name
     * @returns {Element}
     */
    link : function (src, name) {
        var link = Elem.createElem("a");
        link.setAttribute("href", src);
        var lName = document.createTextNode(name);
        link.appendChild(lName);
        return link;
    },

    /**
     * Creates a new parapraph.
     *
     * @param text
     * @returns {Element}
     */
    p : function(text) {
        var p = Elem.createElem("p");
        var pText = document.createTextNode(text);
        p.appendChild(pText);
        return p;
    },

    /**
     * Creates a new textnode and appends to parent.
     *
     * @param parent
     * @param text
     */

    setText : function (parent, text) {
        var textElem = document.createTextNode(text);
        parent.appendChild(textElem);

    }
};
