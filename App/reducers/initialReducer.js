export function populatedActivities(state = {
  nav: "ActivitiesPage",
  fetchingData: false,
  populatedActivities: [],
  categories: []
}, action) {
    switch (action.type) {
    case 'POPULATED_ACTIVITIES':
        return Object.assign({}, state, {
            populatedActivities: action.populatedActivities,
            category: action.category
        });
    case "FETCHING_DATA":
        return Object.assign({}, state, {
          fetchingData: true
        })
    case "DONE_FETCHING":
          return Object.assign({}, state, {
              fetchingData: false
          })
    case "SELECT_ACTIVITY":
      return Object.assign({}, state, {
        selectedActivity: action.selectedActivity,
        selectedActivityOwner: action.selectedActivityOwner
      })

    default:
        return state;
    }
}
