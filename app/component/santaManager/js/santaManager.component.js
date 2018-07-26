(function() {
  "use strict";

  var santaManager = {
    bindings: {},
    transclude: true,
    templateUrl: "app/component/santaManager/tpl/santaManager.tpl.html",
    controller: function($log, $http, $filter, $mdDialog) {
      this.$onInit = function() {
        this.pairList = [];
        this.getUsers();
      };

      // get the users json
      this.getUsers = function() {
        $http({
          method: "GET",
          url: "/app/sources/users.json"
        }).then(
          function(response) {
            this.users = response.data.users;
          }.bind(this),
          function(error) {
            $log.log(error);
            this.users = [];
          }
        );
      };

      // get the list of all the pair
      this.getPairList = function() {
        var santaUserList = this.getSantaUserList();

        angular.forEach(santaUserList, function(u) {
          var notPaired = [];
          var freeUsers = [];
          var pair = {};

          freeUsers = this.getFreeUsers(u);

          if (this.pairList.length > 0) {
            notPaired = this.getNotPaired(freeUsers);
          } else {
            notPaired = freeUsers;
          }

          pair = {
            sender: u,
            recipient: this.getRecipient(
              notPaired,
              santaUserList[santaUserList.length - 1]
            )
          };
          $log.log(notPaired);

          this.pairList.push(pair);
        }.bind(this));
        $log.log(this.pairList);
      };

      // get the pair of selectef user
      this.getMyPair = function(user) {
        var notPaired = [];
        var freeUsers = [];
        var pair = {};

        if (!(this.pairList.length > 0 && this.getThisPair(user).length > 0)) {
          freeUsers = this.getFreeUsers(user);

          if (this.pairList.length > 0) {
            notPaired = this.getNotPaired(freeUsers);
          } else {
            notPaired = freeUsers;
          }

          pair = {
            sender: user,
            recipient: notPaired[Math.floor(Math.random() * notPaired.length)]
          };
          $log.log(notPaired);

          this.pairList.push(pair);
        } else {
          pair = this.getThisPair(user)[0];
        }

        this.openPairAlert(pair);
      };

      // returns the users list without all the sender users
      this.getSantaUserList = function() {
        return $filter("filter")(this.users, function(user) {
          var users = $filter("filter")(this.pairList, function(pair) {
            return pair.sender.guid === user.guid;
          }.bind(this));
          if (users.length === 0) {
            return user.guid;
          }
        }.bind(this));
      };

      // return the user not in a pairlist recipient
      this.getNotPaired = function(freeUsers) {
        return $filter("filter")(freeUsers, function(freeUser) {
          var pairs = $filter("filter")(this.pairList, function(pair) {
            return pair.recipient.guid === freeUser.guid;
          }.bind(this));
          if (pairs.length === 0) {
            return freeUser.guid;
          }
        }.bind(this));
      };

      // return the pair if the user is the sender
      this.getThisPair = function(user) {
        return $filter("filter")(this.pairList, function(pair) {
          return pair.sender.guid === user.guid;
        }.bind(this));
      };

      // returns the users list without the selected user
      this.getFreeUsers = function(user) {
        return $filter("filter")(this.users, function(u) {
          return u.guid !== user.guid;
        }.bind(this));
      };

      // get the recipient for the sender user
      this.getRecipient = function(notPaired, user) {
        var pair;
        switch (notPaired.length) {
          case 0:
            pair = null;
            break;
          case 1:
            pair = notPaired[0];
            break;
          case 2:
            if (
              $filter("filter")(notPaired, function(u) {
                return u.guid === user.guid;
              }).length === 1
            ) {
              pair = $filter("filter")(notPaired, function(u) {
                return u.guid === user.guid;
              })[0];
            } else {
              pair = notPaired[Math.floor(Math.random() * notPaired.length)];
            }

            break;
          default:
            pair = notPaired[Math.floor(Math.random() * notPaired.length)];
            break;
        }

        return pair;
      };

      // open the ticket alert
      this.openPairAlert = function(pair) {
        $mdDialog.show({
          template:
            `
              <div class="alert" layout="column">
                  <md-toolbar class="md-warn" layout-align="center center">
                      <h3>And your pair is</h3>
                  </md-toolbar>
                  
                  <div class="pair" layout="column" layout-align="center center">
                      <span>` +
            pair.recipient.name.first +
            `&nbsp;` +
            pair.recipient.name.last +
            ` </span>
                  </div>
              </div>
              `,
          clickOutsideToClose: true
        });
      };

      // open the gift card
      this.openSantaCard =  function(pair) {
        $mdDialog.show({
          template:
            `
            <div class="alert" layout="column">
                <div class="santa-card">
                    <p>` +
            pair.recipient.name.first +
            `&nbsp;` +
            pair.recipient.name.last +
            ` </p>
                 <p>` +
            pair.recipient.email +
            ` </p>
              <p>` +
            pair.recipient.phone +
            ` </p>
                </div>
            </div>
            `,
          clickOutsideToClose: true
        });
      };

      // reset the pair list
      this.resetPairList =  function() {
        this.pairList = [];
        $log.log(this.pairList);
      };
    }
  };

  angular
    .module("secretSanta.santaManager")
    .component("santaManager", santaManager);
})();
