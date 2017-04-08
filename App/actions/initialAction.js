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
