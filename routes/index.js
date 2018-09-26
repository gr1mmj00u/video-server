import video from './video';

const controllers = [video];

export default (router, container) => controllers.forEach(f => f(router, container));
