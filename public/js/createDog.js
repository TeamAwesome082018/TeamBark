const validateNewDog = () => {
    if ($(`.fileUpload`).val() === `` || $(`.dogName`).val() === ``) {
        $(`.errorMessage`).show();
        event.preventDefault();
    };
};