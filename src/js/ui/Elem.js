/**
 * Class: Element
 * Handles creating and appending elements.
 * @type {Function}
 */
var Elem = (function() {
    //-------------------------------------------------------
    // Private properties
    //-------------------------------------------------------
    /**
     * Reference to Elem
     */
    var _this = {};

    //-------------------------------------------------------
    // Public methods
    //-------------------------------------------------------
    /**
     * Creates new element with class-attribute.
     *
     * @param type {string}
     * @returns {Element}
     */
    _this.createElem = function (type) {
        var element = document.createElement(type);
        return element;
    };

    /**
     * Creates new element with class-attribute.
     *
     * @param type {string}
     * @param classname {string}
     * @returns {Element}
     */
    _this.createClassElem = function (type, classname) {
        var element = document.createElement(type);
        if (classname !== undefined) {element.setAttribute("class",classname);}
        return element;
    };

    /**
     * Creates new element with id-attribute.
     *
     * @param type {string}
     * @param id {string}
     * @returns {Element}
     */
    _this.createIdElem = function (type, id) {
        var element = document.createElement(type);
        if (id !== undefined) {element.setAttribute("id",id);}
        return element;
    };

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {HTMLElement}
     * @param type {string}
     * @returns {Element}
     */
    _this.appendNewElem = function (parent, type) {
        var element = this.createElem(type);
        parent.appendChild(element);
        return element;
    };

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {HTMLElement}
     * @param type {string}
     * @param classname {string}
     * @returns {HTMLElement}
     */
    _this.appendNewClassElem= function (parent, type, classname) {
        var element = this.createClassElem(type, classname);
        parent.appendChild(element);
        return element;
    };

    /**
     * Creates new element and appends to parent element.
     *
     * @param parent {HTMLElement}
     * @param type {string}
     * @param id {string}
     * @returns {HTMLElement}
     */
    _this.appendNewIdElem= function (parent, type, id) {
        var element = this.createIdElem(type, id);
        parent.appendChild(element);
        return element;
    };

    /**
     * Creates a new IMG element.
     *
     * @param src
     * @param alt
     * @param classname
     * @returns {HTMLElement}
     */
    _this.img = function (src, alt, classname) {
        var img = this.createElem("img", classname);
        img.setAttribute("src", src);
        img.setAttribute("alt", alt);
        return img;
    };

    /**
     * Creates a new link (a href).
     *
     * @param src
     * @param name
     * @param classname
     * @returns {HTMLElement}
     */
    _this.link = function (src, name, classname) {
        var link = this.createElem("a", classname);
        link.setAttribute("href", src);
        var lName = document.createTextNode(name);
        link.appendChild(lName);
        return link;
    };

    /**
     * Creates a new parapraph.
     *
     * @param text
     * @param classname
     * @returns {HTMLElement}
     */
    _this.p = function (text, classname) {
        var p = this.createElem("p", classname);
        var pText = document.createTextNode(text);
        p.appendChild(pText);
        return p;
    };

    /**
     * Creates a new textnode and appends to parent.
     *
     * @param parent
     * @param text
     */
    _this.text = function (parent, text) {
        var textElem = document.createTextNode(text);
        parent.appendChild(textElem);
    };
    return _this;
})();