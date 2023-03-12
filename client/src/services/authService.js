export const register = async (data) => {

    return await fetch('http://localhost:1000/user/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export const login = async (data) => {

    return await fetch('http://localhost:1000/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

}