const tasks = {
    tasks:
        [
            {
                text: "Grocery shopping",
                completed: true
            },
            {
                text: "clean yard",
                completed: false
            },
            {
                text: "Film course",
                completed: false
            }

        ],

    getTaskMethod() {
        return this.tasks.filter(task => {
            return task.completed === false
        })
    }

}

console.log(tasks.getTaskMethod())