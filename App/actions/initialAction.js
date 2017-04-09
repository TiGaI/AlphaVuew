export function BTDT(activityID, userID) {
    return dispatch => {
        dispatch(fetching());

        fetch('http://localhost:8080/BTDT', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userID: userID,
                activityID: activityID
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(doneFetching())
            })
            .catch((err) => {
              console.log('error in populatedActivities -> ', err)
            });
    };
}

export function createActivity(activityObject) {
  console.log('INSIDE CREATEACTIVITY ACTIONS', activityObject)
    return dispatch => {
        fetch('http://localhost:8080/createActivity', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                activity: activityObject
              })
            })
            .catch((err) => {
              console.log('error in createActivity -> ', err)
            });
    };
}

export function getPingAroundMe(category, lon, lat) {
    console.log('INSIDE GET PING AROUND ME', category, lon, lat)
  return dispatch => {
      dispatch(fetching());

      fetch('http://localhost:8080/getPingsAroundMe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              category: category,
              lon: lon,
              lat: lat
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {

            console.log("made it to the promised land: ", responseJson)

              dispatch(getActivities(responseJson))
              dispatch(doneFetching())
          })
          .catch((err) => {
            console.log('error in populatedActivities -> ', err)
          });
  };
}

export function selectCategory(category) {
  return dispatch => {
      dispatch(fetching());
      dispath(getCategory());
  };
}

export function getCategoryPins(populatedActivities) {
    return {
        type: 'POPULATED_PINS',
        populatedActivities: populatedActivities
    };
}


export function getActivities(populatedActivities, category) {
    return {
        type: 'POPULATED_ACTIVITIES',
        populatedActivities: populatedActivities
    };
}

export function getCategory(category) {
    return {
        type: 'SELECT_CATEGORY',
        category: category
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
