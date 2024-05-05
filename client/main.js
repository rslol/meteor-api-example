import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { getData } from '../api/api';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.css'

import './main.html';

// Creating the app state
const responseStore = new ReactiveDict();
const displayInfo = new ReactiveVar();
const displayModal = new ReactiveVar();

// Setting the state values onLoad
Template.body.onCreated(function() {
  responseStore.set('apiData', []);
  responseStore.set('isCalled', false);
  displayInfo.set(false);
  displayModal.set(false);
})

// Similar to Vue computed values
Template.body.helpers({
  resData: function() {
    return responseStore.get('apiData');
  }, 
  isCalled: function() {
    return responseStore.get('isCalled');
  }, 
  displayInfo: function() {
    return displayInfo.get();
  }, 
  displayModal: function() {
    return displayModal.get();
  }
})

// Event Handlers
Template.header.events({
  'click #getData':  function() {
    const getDataCall = Meteor.wrapAsync(getData);
    getDataCall('https://dummyjson.com/users').then(res => {
      const users = res.users.map(item => {
        return {
          ...item, 
          displayInfo: false
        }
      });
      responseStore.set('apiData', users); 
      responseStore.set('isCalled', true);
    }).catch(e => {
      console.error(e);
    })
  }
})

Template.table.events({
  'click #displayUserInfo': function(e) {
    const users = responseStore.get('apiData');
    const displayUser = users.map(item => {
      if (item.id === e.currentTarget.dataset.postId * 1) {
        return {
          ...item, 
          displayInfo: !item.displayInfo
        };
      } else {
        return item;
      }
    })
    responseStore.set('apiData', displayUser);
  }
})


