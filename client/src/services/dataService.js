export const addingData = async (input) => {

    return fetch('http://localhost:1000/adding/data', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    });

}

export const addingImage = async (data) => {

    fetch('http://localhost:1000/adding/image', {
        method: "POST",
        body: data,
    });

}

export const addToMyAds = (input) => {

    fetch('http://localhost:1000/my/ads', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    });
}

export const editPic = (data) => {

    
    fetch('http://localhost:1000/edit/pic', {
        method: "POST",
        body: data,
    });
}

export const editData = (oldData) => {

    
    fetch('http://localhost:1000/edit/data', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oldData),
    });

}


export const editMyAds = (oldData, user) => {

    fetch(`http://localhost:1000/edit/myAd/${user}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oldData),
    });
}