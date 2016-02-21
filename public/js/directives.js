angular.module('SomatiColors')
    .directive('navTop', navTop)
    .directive('footerBottom', footerBottom)

    .directive('oneUser', oneUser)
    .directive('editUserForm', editUserForm)

    .directive('allEvents', allEvents)
    .directive('newEventForm', newEventForm)
    .directive('sidebar', sidebar)
    
// Index Directives //'A' == attribute, 'E' == element, 'C' == class
function navTop() {
  var directive = {
  restrict: 'E',
  replace: true,
  templateUrl:  "../partials/_nav.html"
  };
  return directive;
};

function footerBottom() {
  var directive = {
  restrict: 'E',
  replace: true,
  templateUrl:  "../partials/_footer.html"
  };
  return directive;
};

// User Directives //'A' == attribute, 'E' == element, 'C' == class
function oneUser() {
  var directive = {
  restrict: 'E',
  replace: false,
  templateUrl:  "../partials/users/user.html"
  };
  return directive;
};

function editUserForm() {
  var directive = {
  restrict: 'E',
  replace: false,
  templateUrl:  "../partials/users/edit.html"
  };
  return directive;
};

// Event Directives //'A' == attribute, 'E' == element, 'C' == class
function allEvents() {
  var directive = {
  restrict: 'E',
  replace: false,
  templateUrl:  "../partials/events/events.html"
  };
  return directive;
};

function newEventForm() {
  var directive = {
  restrict: 'E',
  replace: false,
  templateUrl:  "../partials/events/new.html"
  };
  return directive;
};

function sidebar() {
  var directive = {
  restrict: 'E',
  replace: false,
  templateUrl:  "../partials/events/sidebar.html"
  };
  return directive;
};