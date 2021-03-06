$(document).ready(function () {
    $('.dropdown-toggle').dropdown()
})


function renderDailyWorkouts() {
    $("#days").empty();
    $.ajax({
            url: "/populatedworkouts",
            method: "GET",
        })
        .then(dbData => {
            console.log(dbData)
            dbData.forEach(day => {
                // make a new div each workout
                const newDiv = $("<div>")
                const title = $("<h3>", {
                    text: day.name
                })
                const newUl = $("<ul>", {
                    text: 'Previous Workout'
                })
                newDiv.append(title)


                //     // loop through meals and print each
                //     plan.meals.forEach(meal => {
                //         const newLi = $("<li>", {
                //             text: `Name: ${meal.name}\nServes: ${meal.servings}\nTasty: ${meal.isTasty ? 'Yes it is!':'No it isn\'t!'}\nIs it a hotdog? ${meal.isHotDog ? "Yes it is!":"No it isnt!"}\nSpiciness: ${meal.spicyLevel}`
                //         })
                //         newUl.append(newLi);
                //     })
                //     // FORM TO ADD NEW MEALS TO THE WEEK
                //     const newForm = $("<form>", {
                //         id: plan._id
                //     })
                //     const newBtn = $("<button>", {
                //         text: 'Add meal...',
                //         class: 'update-btn',
                //         'data-id': plan._id
                //     })
                //     const nameInput = $("<input>", {
                //         type: 'text',
                //         id: `name-${plan._id}`,
                //         placeholder: 'New meal name..'
                //     })
                //     const servLabel = $("<label>", {
                //         for: `serving-${plan._id}`,
                //         text: 'Number of servings: '
                //     })
                //     const servingInput = $("<input>", {
                //         type: 'number',
                //         id: `serving-${plan._id}`
                //     })
                //     const tastyLabel = $("<label>", {
                //         for: `tasty-${plan._id}`,
                //         text: 'Is it tasty? Click if true.'
                //     })
                //     const tastyInput = $("<input>", {
                //         type: 'checkbox',
                //         id: `tasty-${plan._id}`
                //     })
                //     const hotdogLabel = $("<label>", {
                //         for: `hotdog-${plan._id}`,
                //         text: 'Is it hotdog? Click if true.'
                //     })
                //     const hotdogInput = $("<input>", {
                //         type: 'checkbox',
                //         id: `hotdog-${plan._id}`
                //     })
                //     const spicyLabel = $("<label>", {
                //         for: `spicy-${plan._id}`,
                //         text: 'How spicy is it??'
                //     })
                //     const spicyInput = $("<input>", {
                //         type: 'number',
                //         id: `spicy-${plan._id}`
                //     })

                // newForm
                //     .append(nameInput)
                //     .append(servLabel)
                //     .append(servingInput)
                //     .append(tastyLabel)
                //     .append(tastyInput)
                //     .append(hotdogLabel)
                //     .append(hotdogInput)
                //     .append(spicyLabel)
                //     .append(spicyInput)
                //     .append(newBtn)

                // newDiv
                //     .append(newUl)
                //     .append(newForm);


                $("#days").append(newDiv);
            })
        })
}

renderDailyWorkouts();