$(".deletePost").on("click", function () {
    const id = $(".deletePost").data("id");
    console.log(id)
    $.ajax({
        url: "/api/deletepost",
        type: "DELETE",
        data: { id },
        datatype: "json",
        success: function (userID) {
            window.location.replace(`/user/posts/${userID}`)
        }
    });
});

