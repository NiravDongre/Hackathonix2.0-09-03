const predictPriority = (title, deadline)=>{

    const text = title.toLowerCase()

    if(text.includes("urgent") || text.includes("asap")){
        return "high"
    }

    if(deadline){
        const now = new Date()
        const due = new Date(deadline)

        const diff = (due - now) / (1000 * 60 * 60)

        if(diff < 24) return "high"
        if(diff < 72) return "medium"
    }

    return "low"
}

module.exports = predictPriority