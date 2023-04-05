export function saveMessage(data) {

    fetch(`http://localhost:1000/sendMessage/`, {
        method: 'POST',
        headers: {
            'content-type': 'Application/json'
        },
        body: JSON.stringify({
            message: data.message,
            recipient: data.recipient,
            sender: data.sender,
            title: data.title
        })

    });
}