export function populatedActivities(category, prevCategory, nextCategory, populatedActivities) {
    return dispatch => {
        dispatch(fetching());

        fetch('http://localhost:8080/populateActivities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                category: category,
                prevCategory: prevCategory,
                nextCategory: nextCategory,
                length: populatedActivities
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var activitiesObject = {
                  ...responseJson
                };
                dispatch(getActivities(activitiesObject, category));
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error in populatedActivities -> ', err)
            });
    };
}


function fetching(){
  return {
    type: "FETCHING_DATA"
  }
}
function doneFetching() {
  return {
    type: "DONE_FETCHING"
  }
}
export function getActivities(populatedActivities, category) {
    return {
        type: 'POPULATED_ACTIVITIES',
        populatedActivities: populatedActivities,
        category: category
    };
}

export function getNotifications(notifications) {
    return {
        type: 'GET_NOTIFICATIONS',
        notifications
    };
}

export function sendFriendRequest(currentUserID, friendToAddID){

  return dispatch => {
      dispatch(fetching());
      console.log('currentUserID in sendFriendRequest in initialAction: ', currentUserID);
      console.log('friendToAddID in sendFriendRequest in initialAction: ', friendToAddID);

      fetch('http://localhost:8080/sendFriendRequest', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              toUser: friendToAddID,
              fromUser: currentUserID
            })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log('you send a friend request!')
          })
          .catch((err) => {
            console.log('error: ', err)
          });
  };
}

export function acceptFriendRequest(currentUserID, friendToAddID, accepted) {

  return dispatch => {
      dispatch(fetching());
      console.log('currentUserID in acceptFriendRequest in initialAction: ', currentUserID);
      console.log('friendToAddID in acceptFriendRequest in initialAction: ', friendToAddID);

      fetch('http://localhost:8080/acceptFriendRequest', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              accepted: accepted,
              toUserID: friendToAddID,
              fromUserID: currentUserID
            })
        }).then((response) => response.json())
          .then((responseJson) => {
            getUserNotifications(currentUserID)(dispatch);
            dispatch(doneFetching())
          })
          .catch((err) => {
            console.log('error: ', err)
          });
  };
}

export function getUserNotifications(currentUserID) {

    return dispatch => {
        dispatch(fetching());
        console.log('currentUserID in getNotifications in initialAction: ', currentUserID);

        fetch('http://localhost:8080/getNotification', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userID: currentUserID
              })
            }).then((response) => response.json())
            .then((responseJson) => {

                var userObject = [...responseJson];
                console.log(userObject, ' is the super userObject from getUserNotifications');
                dispatch(getNotifications(userObject));
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error: ', err)
            });
    };
}

export function joinActivity(currentUserID, activityID, activityOwner) {

    return dispatch => {
        dispatch(fetching());
        console.log('currentUserID in joinActivity in initialAction: ', currentUserID);
        console.log('currentUserID in joinActivity in initialAction: ', activityID);

        fetch('http://localhost:8080/joinActivity', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fromUserID: currentUserID,
                activityID: activityID,
                toUserID: activityOwner
              })
            }).then((response) => response.json())
            .then((responseJson) => {

                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error: ', err)
            });
    };
}

export function getActivityRequest(currentUserID) {

    return dispatch => {
        dispatch(fetching());
        console.log('currentUserID in getActivityRequest in initialAction: ', currentUserID);

        fetch('http://localhost:8080/getActivityRequest', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userID: currentUserID
              })
            }).then((response) => response.json())
            .then((responseJson) => {

                var activityJoinObject = [...responseJson];

                dispatch(getJoinActivity(activityJoinObject));
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error: ', err)
            });
    };
}

export function getJoinActivity(joinActivityRequest) {
    return {
        type: 'GET_JOINACTIVITY',
        joinActivityRequest
    };
}

export function acceptActivityRequest(currentUserID, approvalUserID, activityID, accepted) {

    return dispatch => {
        dispatch(fetching());
        console.log('currentUserID in getActivityRequest in initialAction: ', currentUserID);

        fetch('http://localhost:8080//acceptActivityRequest', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                toUserID: currentUserID,
                fromUserID: approvalUserID,
                activityID: activityID,
                accepted: accepted
              })
            }).then((response) => response.json())
            .then((responseJson) => {


                getActivityRequest(currentUserID)(dispatch);
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error: ', err)
            });
    };
}
