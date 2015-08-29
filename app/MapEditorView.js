import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
var MapEditorView = Backbone.View.extend({
  el: "#map-editor-view",
  events: {
    "click .play-button": "reloadLevel",
    "blur .game-map-text": "focusOnGame"
  },
  focusOnGame: function() {
    window.frames[0].getElementById("canvas").focus();
  },
  reloadLevel: function() {
    this.$(".game-map-text").blur();
    this.$(".play-button").blur();
    window.frames[0].focus();
    var mapText = this.$(".game-map-text").val();
    if (this.model) {
      this.model.set("mapText", mapText);
    }

    if (window.frames[0] && _.isFunction(window.frames[0].SendMessage)) {
      window.frames[0].SendMessage("WorldLoader", "Refresh");
    }
  }
});

export default MapEditorView;
