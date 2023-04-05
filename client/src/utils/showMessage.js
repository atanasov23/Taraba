export const showMessage = (value) => {

    const messageDiv = document.getElementsByClassName('showMessage')[0];

    messageDiv.style.display = 'block';

    messageDiv.textContent = value;

    setTimeout(() => {

        messageDiv.style.display = 'none';

    }, 2000);

}