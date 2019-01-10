$(`.foundDog`).on(`click`, function () {
    const id = $(this).val();
    $.ajax({
        url: "/api/founddog",
        type: "PUT",
        data: { id },
        datatype: "json",
        success: function (userID) {
            window.location.replace(`/user/${userID}`)
        }
    })
})