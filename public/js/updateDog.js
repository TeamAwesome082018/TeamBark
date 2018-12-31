$(".deleteDog").on("click", function () {
    const id = $(".deleteDog").data("id");
    console.log(id)
    $.ajax({
        url: "/api/deletedog",
        type: "DELETE",
        data: { id },
        datatype: "json",
        success: function (userID) {
            window.location.replace(`/user/${userID}`)
        }
    })
});