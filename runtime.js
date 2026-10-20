/* UTP prototype runtime: renders a page template with its screen logic.
   No dependencies. Each page provides:
   <template id="tpl">   the markup with {{holes}}, data-sc="for|if" templates
   <script id="logic">   a `class Component extends DCLogic { renderVals() {...} }`
   <script id="props">   JSON with default props (e.g. accent colour)            */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var HOLE = /\{\{\s*([^{}]+?)\s*\}\}/g;
  var SINGLE = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;
  var BOOL_PROPS = { checked: 1, selected: 1, disabled: 1 };

  var pending = false;
  var instance = null;

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patch) {
    var next = typeof patch === 'function' ? patch(this.state) : patch;
    Object.assign(this.state, next);
    schedule();
  };

  function lookup(expr, scope) {
    expr = expr.trim();
    if (expr === 'true') return true;
    if (expr === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
    var parts = expr.split('.');
    var cur, found = false;
    for (var i = scope.length - 1; i >= 0; i--) {
      var s = scope[i];
      if (s && Object.prototype.hasOwnProperty.call(s, parts[0])) {
        cur = s[parts[0]];
        found = true;
        break;
      }
    }
    if (!found) return undefined;
    for (var j = 1; j < parts.length; j++) {
      if (cur == null) return undefined;
      cur = cur[parts[j]];
    }
    return cur;
  }

  function interp(str, scope) {
    return str.replace(HOLE, function (m, e) {
      var v = lookup(e, scope);
      if (v === undefined) return m; // keep literal placeholders such as {{users.standard}}
      if (v === null || v === false) return '';
      return String(v);
    });
  }

  function render(nodes, scope, parent) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === 3) {
        parent.appendChild(document.createTextNode(interp(node.nodeValue, scope)));
        continue;
      }
      if (node.nodeType !== 1) continue;

      if (node.localName === 'template') {
        var kind = node.getAttribute('data-sc');
        if (kind === 'for') {
          var lm = (node.getAttribute('list') || '').match(SINGLE);
          var list = lm ? lookup(lm[1], scope) : null;
          var as = node.getAttribute('as') || 'item';
          if (Array.isArray(list)) {
            for (var k = 0; k < list.length; k++) {
              var frame = {};
              frame[as] = list[k];
              render(node.content.childNodes, scope.concat([frame]), parent);
            }
          }
        } else if (kind === 'if') {
          var vm = (node.getAttribute('value') || '').match(SINGLE);
          if (vm && lookup(vm[1], scope)) render(node.content.childNodes, scope, parent);
        }
        continue;
      }

      var el = node.namespaceURI === SVG_NS
        ? document.createElementNS(SVG_NS, node.localName)
        : document.createElement(node.localName);

      for (var a = 0; a < node.attributes.length; a++) {
        var name = node.attributes[a].name;
        var value = node.attributes[a].value;
        if (name.indexOf('hint-') === 0) continue;
        var sm = value.match(SINGLE);
        if (sm) {
          var v = lookup(sm[1], scope);
          if (name.indexOf('on') === 0) {
            if (typeof v === 'function') el.addEventListener(name.slice(2).toLowerCase(), v);
            continue;
          }
          if (BOOL_PROPS[name]) {
            if (v) el.setAttribute(name, '');
            el[name] = !!v;
            continue;
          }
          if (v === undefined) { el.setAttribute(name, value); continue; }
          if (v === false || v === null) continue;
          el.setAttribute(name, v === true ? '' : String(v));
        } else {
          el.setAttribute(name, interp(value, scope));
        }
      }

      render(node.childNodes, scope, el);
      parent.appendChild(el);
    }
  }

  function draw() {
    pending = false;
    var app = document.getElementById('app');
    var tpl = document.getElementById('tpl');
    var vals;
    try {
      vals = instance.renderVals() || {};
    } catch (err) {
      console.error('renderVals failed', err);
      return;
    }
    var y = window.scrollY;
    var frag = document.createDocumentFragment();
    render(tpl.content.childNodes, [vals], frag);
    app.replaceChildren(frag);
    window.scrollTo(0, y);
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(draw);
  }

  function boot() {
    var propsEl = document.getElementById('props');
    var props = propsEl ? JSON.parse(propsEl.textContent || '{}') : {};
    var code = document.getElementById('logic').textContent;
    var Component = new Function('DCLogic', code + '\nreturn Component;')(DCLogic);
    instance = new Component(props);
    if (!instance.state) instance.state = {};
    draw();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
