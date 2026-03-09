const sortTodos = (todos) => {

    const priorityWeight = {
        high: 3,
        medium: 2,
        low: 1
    }

    return todos.sort((a,b)=>{

        const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority]

        if(priorityDiff !== 0){
            return priorityDiff
        }

        if(a.deadline && b.deadline){
            return new Date(a.deadline) - new Date(b.deadline)
        }

        return 0
    })
}

module.exports = sortTodos