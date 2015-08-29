import "bootstrap";
import Backbone from 'backbone';
import Router from "./router";
import $ from 'jquery';
import MapEditorView from './MapEditorView';

var mapEditorView = new MapEditorView();

$(function(){
  window.frames[0].focus();
})

export default Router;


// throw new Error();
