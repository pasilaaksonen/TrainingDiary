import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =  authorization.substring(7);
  };
    next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization');  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =  authorization.substring(7);
    const decodedToken = jwt.verify(request.token, config.SECRET);
    request.user = decodedToken.id;
  };
    next();
};

let middlewares = {
    tokenExtractor,
    userExtractor
};

export default middlewares;