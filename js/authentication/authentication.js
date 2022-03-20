import {
	BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException
} from '../exceptions.js';
import { User } from '../entities/user.js'

class AuthenticationServiceException extends BaseException {
	constructor(message = 'Error: Authentication Service Exception.', fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = 'AuthenticationServiceException';
	}
}

let AuthenticationService = (function () {
	let instantiated;

	function init() {
		class Authentication {

			constructor() {
				if (!new.target) throw new InvalidAccessConstructorException();
			}

			validateUser(username, password) {
				return (username === 'admin' && password === 'admin') ? true : false;
			}

			getUser(username) {
				let user = null;
				if (username === 'admin') user = new User('admin');
				return user;
			}

		}

		let auth = new Authentication();
		Object.freeze(auth);
		return auth;
	}
	return {
		getInstance: function () {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();

export default AuthenticationService;
