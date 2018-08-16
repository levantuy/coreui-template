import { logout } from '../actions/action_auth';

export default store => next => action => {

    // Checks to see if the action has a payload and if the payload is an ApiError

    if (action.payload && (action.payload.name === 'ApiError' || action.payload.name === 'RequestError')) {
        console.log(action)
        if (action.payload.status === 403) {
            if (action.error && action.meta) {
                store.dispatch(action.meta.handler(action.meta.pushTo, action.meta.errorMsg))
            } else {
                // To avoid getting stuck in middleware.
                return next(action)
            }
        } else if (action.payload.status === 401) {
            var errorMsg = 'Your session has expired. Please login again.'
            store.dispatch(logout())
        } else if (action.payload.name === "RequestError") {
            window.location.href= "/404";            
        } else if (action.payload.status === 500) {
            window.location.href= "/500";
        }
    } else {
        // So the middleware doesn't get applied to every single action
        return next(action)
    }
}