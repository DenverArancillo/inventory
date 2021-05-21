import Cookies from 'universal-cookie';

class Cookie {
    constructor () {
        this.cookie = new Cookies();
    }

    set (key, value, options) {
        this.cookie.set(key, value, options);
    }

    get (key) {
        return this.cookie.get(key);
    }

    remove (key) {
        this.cookie.remove(key);
    }
}

export default new Cookie();