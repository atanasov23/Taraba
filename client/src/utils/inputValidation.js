
export function dataValidation(data) {

    if (data.username === undefined
        || data.password === undefined
        || data.confirmPassword === undefined
        || data.email === undefined) {

        return {
            err: 'All fields is required',
            send: false
        };
    } else {

        return { send: true };

    }
}

export function inputValidation(element, password) {

    if (element.value.length < 3 && element.name === 'username') {

        return 'Username is too short!';

    } else if (element.value.length < 3 && element.name === 'password') {

        return 'Password is too short!';

    } else if (password.current !== element.value && element.name === 'confirmPassword') {

        return 'The passwords do not match';

    } else if (element.name === 'email' && !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(element.value)) {

        return 'Email is invalid';

    }
}


