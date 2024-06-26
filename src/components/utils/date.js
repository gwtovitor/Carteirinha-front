export function formatDateToFront(dateISO) {

    const date = new Date(dateISO);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}