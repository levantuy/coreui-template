import { isRSAA, apiMiddleware } from 'redux-api-middleware';

export const apiMiddlewareWrapper = ({dispatch}) => next => (action) => {
	if(!isRSAA(action)) {
		return next(action);
	}

	const {onSuccess, onFailure, ...rsaaAction} = action;
	if(!onSuccess && !onFailure) {
		return next(rsaaAction);
	}

	return (async() => {
		const response = await next(rsaaAction);
		if(response.error && onFailure) {
			dispatch(onFailure);
		} else if(onSuccess) {
			dispatch(onSuccess);
		}
		return response;
	})();
};