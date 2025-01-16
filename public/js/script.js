function openModal() {
    document.body.classList.add('fixed-body');
    document.getElementById('mainModal').classList.add('active');
}

function closeModal() {
    document.body.classList.remove('fixed-body');
    document.getElementById('mainModal').classList.remove('active');
}

// Открытие модального окна при нажатии кнопки
document.querySelector('button[onclick="openModal()"]').addEventListener('click', function(event) {
    event.stopPropagation();
    openModal();
});

// Закрытие модального окна при нажатии кнопки закрытия
document.querySelector('button[onclick="closeModal()"]').addEventListener('click', function(event) {
    closeModal();
});
