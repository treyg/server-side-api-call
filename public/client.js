
    
    
    fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(jsonData => {
        console.log(jsonData)

        const stons = []
        stons.push(jsonData)

        console.log(stons[0].id)
    })

    