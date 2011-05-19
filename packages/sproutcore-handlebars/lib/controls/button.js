// ==========================================================================
// Project:   SproutCore Handlebar Views
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var get = SC.get, set = SC.set;

SC.Button = SC.View.extend({
  classNames: ['sc-button'],
  classNameBindings: ['isActive'],

  tagName: 'button',
  
  targetObject: function() {
    var target = this.get('target');

    if (SC.typeOf(target) === "string") {
      return SC.getPath(target);
    } else {
      return target;
    }
  }.property('target').cacheable(),

  mouseDown: function() {
    console.log('MOUSE DOWN');
    set(this, 'isActive', true);
    this._mouseDown = true;
    this._mouseEntered = true;
  },

  mouseLeave: function() {
    if (this._mouseDown) {
      set(this, 'isActive', false);
      this._mouseEntered = false;
    }
  },

  mouseEnter: function() {
    if (this._mouseDown) {
      set(this, 'isActive', true);
      this._mouseEntered = true;
    }
  },

  mouseUp: function(event) {
    console.log('MOUSE UP');
    if (get(this, 'isActive')) {
      var action = get(this, 'action'),
          target = get(this, 'targetObject');

      if (target && action) {
        if (typeof action === 'string') {
          action = target[action];
        }
        action.call(target, this);
      }

      set(this, 'isActive', false);
    }

    this._mouseDown = false;
    this._mouseEntered = false;
  },

  // TODO: Handle proper touch behavior.  Including should make inactive when
  // finger moves more than 20x outside of the edge of the button (vs mouse
  // which goes inactive as soon as mouse goes out of edges.)

  touchStart: function(touch) {
    this.mouseDown(touch);
  },

  touchEnd: function(touch) {
    this.mouseUp(touch);
  }
});